import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { updateCaslAbility } from "@/config/permissions";
import type {
  AuthenticatedAdminUser,
  ProfileStoreStateType,
} from "@/lib/types/auth";

export type {
  AuthenticatedAdminUser,
  ProfileStoreStateType,
} from "@/lib/types/auth";

const AUTH_STORAGE_KEY = "app-auth-storage";

interface AuthPersistedSnapshot {
  appIsLoggedIn?: boolean;
  appRefreshToken?: string | null;
  appSession?: { refresh_expires_at: string | null } | null;
}

const readAuthPersistedState = (): AuthPersistedSnapshot | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) ?? sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: AuthPersistedSnapshot } | AuthPersistedSnapshot;
    if (typeof parsed === "object" && parsed !== null && "state" in parsed && parsed.state) {
      return parsed.state;
    }
    return parsed as AuthPersistedSnapshot;
  } catch {
    return null;
  }
};

const isAuthSessionValid = (): boolean => {
  const auth = readAuthPersistedState();
  if (!auth?.appIsLoggedIn || !auth?.appRefreshToken) return false;
  if (auth.appSession?.refresh_expires_at) {
    const exp = new Date(auth.appSession.refresh_expires_at).getTime();
    if (Number.isFinite(exp) && exp <= Date.now()) return false;
  }
  return true;
};

const baseState = {
  appUser: null as AuthenticatedAdminUser | null,
  _hasHydrated: false,
};

const useProfileStore = create<ProfileStoreStateType>()(
  devtools(
    persist(
      (set) => ({
        ...baseState,
        setHasHydrated: (hasHydrated = true) => set(() => ({ _hasHydrated: hasHydrated })),
        setAppUser: (user: AuthenticatedAdminUser | null) => {
          updateCaslAbility(user);
          set(() => ({ appUser: user }));
        },
        clearProfile: () => {
          updateCaslAbility(null);
          set(() => ({ appUser: null }));
        },
      }),
      {
        name: "app-profile-storage",
        storage: createJSONStorage(() => ({
          getItem: (name) => {
            if (typeof window === "undefined") return null;
            return localStorage.getItem(name) ?? sessionStorage.getItem(name);
          },
          setItem: (name, value) => {
            if (typeof window === "undefined") return;
            // Mirror auth store: persistSession=true → localStorage, else sessionStorage
            if (localStorage.getItem(AUTH_STORAGE_KEY)) {
              localStorage.setItem(name, value);
              sessionStorage.removeItem(name);
            } else {
              sessionStorage.setItem(name, value);
              localStorage.removeItem(name);
            }
          },
          removeItem: (name) => {
            if (typeof window === "undefined") return;
            localStorage.removeItem(name);
            sessionStorage.removeItem(name);
          },
        })),
        partialize: (state) => ({ appUser: state.appUser }),
        merge: (persistedState, currentState) => {
          // If auth session is no longer valid, clear profile on hydration
          if (!isAuthSessionValid()) {
            updateCaslAbility(null);
            return { ...currentState, appUser: null };
          }
          const storageState =
            typeof persistedState === "object" &&
              persistedState !== null &&
              "state" in persistedState &&
              typeof (persistedState as { state?: unknown }).state === "object"
              ? (persistedState as { state: Partial<ProfileStoreStateType> }).state
              : (persistedState as Partial<ProfileStoreStateType> | null);
          const appUser = storageState?.appUser ?? null;
          updateCaslAbility(appUser);
          return {
            ...currentState,
            appUser,
          };
        },
        onRehydrateStorage: () => {
          return (state: ProfileStoreStateType | undefined, error: unknown) => {
            if (error) {
              useProfileStore.persist.clearStorage();
            }
            (state ?? useProfileStore.getState()).setHasHydrated(true);
          };
        },
      },
    ),
  ),
);

export default useProfileStore;
