import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import {
  setAccessToken as setTokenStore,
  clearAccessToken as clearTokenStore,
} from "../interceptor/tokenStore";

interface AuthContextValue {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync token with tokenStore so the Axios interceptor has access to it
  useEffect(() => {
    if (accessToken) {
      setTokenStore(accessToken);
    } else {
      clearTokenStore();
    }
  }, [accessToken]);

  // On mount, attempt a silent refresh to restore the session.
  // The refresh token lives in an httpOnly cookie set by the server,
  // so the browser sends it automatically — no JS access needed.
  useEffect(() => {
    axios
      .post("/api/auth/refresh", {}, { withCredentials: true })
      .then((res) => {
        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken);
        }
      })
      .catch(() => {
        // No valid refresh token cookie — user must log in.
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Block rendering until the silent-refresh check completes.
  // This prevents a login-page flash on every page refresh for logged-in users.
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
