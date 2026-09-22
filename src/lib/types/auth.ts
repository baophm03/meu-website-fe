import type { Permission } from "./permissions";

export interface AuthenticatedAdminUser {
  id: string;
  email: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  roles: string[];
  permissions: Permission[];
  status: string | null;
  last_login_at: string | null;
  must_change_password?: boolean;
}

export interface AuthenticatedAdminSession {
  id: string | null;
  expires_at: string | null;
  refresh_expires_at: string | null;
}

export interface AuthSessionPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  accessTokenExpired?: number | null;
  session: AuthenticatedAdminSession | null;
  persistSession?: boolean;
}

export interface AuthRefreshPayload {
  accessToken: string;
  expiresIn: number;
  accessTokenExpired?: number | null;
  refreshToken?: string | null;
  session?: AuthenticatedAdminSession | null;
}

export interface AuthStoreStateType {
  appIsLoggedIn: boolean;
  appAccessToken: string | null;
  appAccessTokenExpired: number | null;
  appRefreshToken: string | null;
  appSession: AuthenticatedAdminSession | null;
  appPersistSession: boolean;
  appIsRefreshing: boolean;
  appSessionExpiredNotified: boolean;
  appUserRemember: {
    username: string;
    remember: boolean;
  } | null;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated?: boolean) => void;
  setAppIsLoggedIn: (isLoggedIn: boolean) => void;
  setAuthSession: (payload: AuthSessionPayload) => void;
  updateAccessToken: (payload: AuthRefreshPayload) => void;
  setAppToken: (accessToken: string, accessTokenExpired: number, refreshToken?: string) => void;
  setAppRefreshing: (isRefreshing: boolean) => void;
  markSessionExpiredNotified: (notified: boolean) => void;
  removeAppToken: () => void;
  setAppUserRemember: (username: string, remember: boolean) => void;
  resetStore: () => void;
}

export interface ProfileStoreStateType {
  appUser: AuthenticatedAdminUser | null;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated?: boolean) => void;
  setAppUser: (user: AuthenticatedAdminUser | null) => void;
  clearProfile: () => void;
}
