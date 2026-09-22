"use client";

import { toast } from "sonner";
import useAuthStore, {
  type AuthenticatedAdminSession,
} from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import links from "@/links";

const AUTH_BASE_URL = `${links.apiEndpoint}/api/v1.0/auth`;
const SESSION_EXPIRED_MESSAGE = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";

interface AuthEnvelope<T> {
  message?: string | null;
  message_en?: string | null;
  responseData?: T;
  data?: {
    responseData?: T;
  };
}

interface AuthErrorPayload {
  message?: string | null;
  message_en?: string | null;
  error?: {
    message?: {
      vi?: string | null;
      en?: string | null;
    };
  };
}

interface RefreshResponseData {
  session?: Partial<AuthenticatedAdminSession> | null;
  access_token?: string | null;
  refresh_token?: string | null;
  expires_in?: number | null;
  token_type?: string | null;
}

interface RefreshResponseEnvelope {
  responseData?: RefreshResponseData;
}

interface AuthRequestOptions extends RequestInit {
  skipAuthHeader?: boolean;
  authToken?: string | null;
  noEnvelope?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;
const ACCESS_TOKEN_EXPIRY_SKEW_SECONDS = 300;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getEnvelopeData = <T>(payload: AuthEnvelope<T>) =>
  payload.responseData ?? payload.data?.responseData;

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (!isObject(payload)) return fallback;

  const apiPayload = payload as AuthErrorPayload;
  return (
    apiPayload.error?.message?.vi ??
    apiPayload.message ??
    apiPayload.message_en ??
    fallback
  );
};

const normalizeSession = (
  session?: Partial<AuthenticatedAdminSession> | null,
): AuthenticatedAdminSession | null => {
  if (!session) return null;

  return {
    id: typeof session.id === "string" ? session.id : null,
    expires_at: typeof session.expires_at === "string" ? session.expires_at : null,
    refresh_expires_at:
      typeof session.refresh_expires_at === "string" ? session.refresh_expires_at : null,
  };
};

const getJwtExpiresAt = (token?: string | null) => {
  if (!token) return null;

  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded =
      typeof window === "undefined"
        ? Buffer.from(normalizedPayload, "base64").toString("utf8")
        : window.atob(normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, "="));
    const parsed = JSON.parse(decoded) as { exp?: unknown };
    const exp = typeof parsed.exp === "number" ? parsed.exp : null;

    return exp ? (exp - ACCESS_TOKEN_EXPIRY_SKEW_SECONDS) * 1000 : null;
  } catch {
    return null;
  }
};

async function requestAuth<T>(
  path: string,
  init?: AuthRequestOptions,
): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  if (!init?.skipAuthHeader) {
    const token = init?.authToken ?? useAuthStore.getState().appAccessToken;
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${AUTH_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });

  const data = (await response.json().catch(() => ({}))) as AuthEnvelope<T> & AuthErrorPayload;

  if (!response.ok) {
    const error = new Error(getErrorMessage(data, "Yêu cầu xác thực thất bại.")) as Error & {
      status?: number;
      payload?: unknown;
    };

    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return init?.noEnvelope ? (data as T) : getEnvelopeData(data) as T;
}

export const redirectToLogin = () => {
  if (typeof window === "undefined") return;

  const currentPath = `${window.location.pathname}${window.location.search}`;
  // Không redirect về các trang auth sau khi login lại
  const isAuthPage =
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/forgot-password") ||
    currentPath.startsWith("/admin/change-password");
  const redirect =
    currentPath.startsWith("/admin") && !isAuthPage
      ? `?redirect=${encodeURIComponent(currentPath)}`
      : "";

  window.location.replace(`/login${redirect}`);
};

const markSessionExpiredAndNotify = () => {
  const store = useAuthStore.getState();

  if (!store.appSessionExpiredNotified) {
    store.markSessionExpiredNotified(true);
    toast.error(SESSION_EXPIRED_MESSAGE);
  }
};


export async function refreshAdminAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const store = useAuthStore.getState();
    const refreshToken = store.appRefreshToken;

    if (!refreshToken) {
      useAuthStore.getState().resetStore();
      useProfileStore.getState().clearProfile();
      redirectToLogin();
      return null;
    }

    // Refresh token đã hết hạn → không gọi API, logout ngay
    if (store.appSession?.refresh_expires_at) {
      const refreshExpiredAt = new Date(store.appSession.refresh_expires_at).getTime();
      if (Number.isFinite(refreshExpiredAt) && refreshExpiredAt <= Date.now()) {
        useAuthStore.getState().resetStore();
        useProfileStore.getState().clearProfile();
        redirectToLogin();
        return null;
      }
    }

    store.setAppRefreshing(true);

    try {
      const payload = await requestAuth<RefreshResponseEnvelope>("/refresh", {
        method: "POST",
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
        skipAuthHeader: true,
      });

      const refreshData = payload?.responseData ?? payload as RefreshResponseData;

      if (!refreshData?.access_token || !refreshData?.expires_in) {
        throw new Error("Thiếu access token mới từ API.");
      }

      useAuthStore.getState().updateAccessToken({
        accessToken: refreshData.access_token,
        expiresIn: refreshData.expires_in,
        accessTokenExpired: getJwtExpiresAt(refreshData.access_token),
        refreshToken: refreshData.refresh_token ?? refreshToken,
        session: normalizeSession(refreshData.session),
      });

      return refreshData.access_token;
    } catch (error) {
      markSessionExpiredAndNotify();
      useAuthStore.getState().resetStore();
      useProfileStore.getState().clearProfile();
      useAuthStore.getState().markSessionExpiredNotified(true);
      redirectToLogin();
      throw error;
    } finally {
      useAuthStore.getState().setAppRefreshing(false);
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function ensureValidAdminAccessToken() {
  const store = useAuthStore.getState();

  // No access token at all — try refresh if we have a usable refresh token
  if (!store.appAccessToken) {
    if (store.appRefreshToken && isRefreshTokenUsable(store.appSession)) {
      return refreshAdminAccessToken();
    }
    // No usable refresh token — logout
    if (store.appIsLoggedIn) {
      useAuthStore.getState().resetStore();
      useProfileStore.getState().clearProfile();
      redirectToLogin();
    }
    return null;
  }

  // Determine expiry: prefer stored appAccessTokenExpired, fallback to JWT exp
  const expiryMs =
    store.appAccessTokenExpired ?? getJwtExpiresAt(store.appAccessToken);

  // If we can't determine expiry, assume token is still valid (let 401 handle it)
  if (expiryMs === null) {
    return store.appAccessToken;
  }

  // Token still valid — use it
  if (expiryMs > Date.now()) {
    return store.appAccessToken;
  }

  // Token expired — need refresh; check refresh token usability first
  if (!store.appRefreshToken || !isRefreshTokenUsable(store.appSession)) {
    useAuthStore.getState().resetStore();
    useProfileStore.getState().clearProfile();
    redirectToLogin();
    return null;
  }

  return refreshAdminAccessToken();
}

const isRefreshTokenUsable = (session: AuthenticatedAdminSession | null): boolean => {
  if (!session?.refresh_expires_at) return true; // không biết → cho phép thử
  const time = new Date(session.refresh_expires_at).getTime();
  return Number.isFinite(time) && time > Date.now();
};

export async function handleAdminUnauthorized() {
  markSessionExpiredAndNotify();
  useAuthStore.getState().resetStore();
  useProfileStore.getState().clearProfile();
  useAuthStore.getState().markSessionExpiredNotified(true);
  redirectToLogin();
}

export const adminSessionExpiredMessage = SESSION_EXPIRED_MESSAGE;
