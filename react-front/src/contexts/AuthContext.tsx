"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { useToast } from "./ToastContext";

const REQUIRED_ROLE = "professional";
const COOKIE_PREFIX = REQUIRED_ROLE;
export const ACCESS_COOKIE = `${COOKIE_PREFIX}_accessToken`;
const REFRESH_COOKIE = `${COOKIE_PREFIX}_refreshToken`;

const cookieBase = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

interface User {
  id: string;
  name: string;
  cpf: string;
  role: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  accessToken: string | null;
  login: (
    email: string,
    password: string,
    remember: boolean,
    redirectTo?: string
  ) => Promise<void>;
  logout: () => void;
  fetchWithAuth: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    Cookies.remove(ACCESS_COOKIE);
    Cookies.remove(REFRESH_COOKIE);
    router.push("/login");
  }, [router]);

  const fetchUserMe = useCallback(
    async (token: string, { logoutOnError = true } = {}) => {
      try {
        const res = await fetch(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = await res.json();
        if (res.ok && body.result === "ok") {
          const u = body.data.attributes;
          setUser({
            id: u.id,
            name: u.name,
            cpf: u.cpf,
            role: u.role,
            email: u.email,
          });
          return true;
        }
      } catch {}
      if (logoutOnError) logout();
      return false;
    },
    [logout]
  );

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const rToken = Cookies.get(REFRESH_COOKIE);
    if (!rToken) return null;

    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: rToken }),
      });
      const body = await res.json();
      if (!res.ok || body.result !== "ok") throw new Error("Refresh falhou");

      const newAT: string = body.data.attributes.accessToken;
      const { role } = decodeJwt(newAT) as { role: string };
      if (role !== REQUIRED_ROLE) throw new Error("Role inválido");

      Cookies.set(ACCESS_COOKIE, newAT, cookieBase);
      setAccessToken(newAT);
      return newAT;
    } catch (err) {
      console.error(err);
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    (async () => {
      const token = Cookies.get(ACCESS_COOKIE);
      if (!token) {
        setIsLoading(false);
        return;
      }

      const decoded = decodeJwt(token) as { exp: number; role: string };
      if (decoded.role !== REQUIRED_ROLE) {
        logout();
        setIsLoading(false);
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      let valid = token;

      if (decoded.exp < now) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          setIsLoading(false);
          return;
        }
        valid = refreshed;
      }

      setAccessToken(valid);
      await fetchUserMe(valid);
      setIsLoading(false);
    })();
  }, [fetchUserMe, refreshAccessToken, logout]);

  useEffect(() => {
    if (!accessToken) return;

    const { exp } = decodeJwt(accessToken) as { exp: number };
    const now = Math.floor(Date.now() / 1000);
    const delay = Math.max((exp - now - 60) * 1000, 0);

    const id = window.setTimeout(() => {
      refreshAccessToken();
    }, delay);
    return () => clearTimeout(id);
  }, [accessToken, refreshAccessToken]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      remember: boolean,
      redirectTo?: string
    ) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const body = await res.json();
        if (!res.ok || body.result !== "ok") {
          showToast("Credenciais inválidas.", "error");
          return;
        }

        const { accessToken: newAT, refreshToken: newRT } =
          body.data.attributes;
        const { role } = decodeJwt(newAT) as { role: string };
        if (role !== REQUIRED_ROLE) {
          showToast("Acesso negado: usuário sem permissão.", "error");
          return;
        }

        Cookies.set(ACCESS_COOKIE, newAT, {
          ...cookieBase,
          ...(remember ? { expires: 14 } : {}),
        });
        Cookies.set(REFRESH_COOKIE, newRT, {
          ...cookieBase,
          ...(remember ? { expires: 14 } : {}),
        });

        setAccessToken(newAT);
        router.replace(redirectTo ?? "/agenda");
        fetchUserMe(newAT).catch(() => {
          showToast("Não deu para carregar seus dados agora.", "warning");
        });
        showToast("Login realizado com sucesso!", "success");
      } catch (err) {
        console.error(err);
        showToast("Erro inesperado no servidor.", "error");
      }
    },
    [fetchUserMe, router, showToast]
  );

  const fetchWithAuth = useCallback(
    async (input: RequestInfo, init: RequestInit = {}) => {
      if (!accessToken) throw new Error("Sem token");

      const headers = {
        ...(init.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };
      let res = await fetch(input, { ...init, headers });

      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          res = await fetch(input, {
            ...init,
            headers: {
              ...(init.headers || {}),
              Authorization: `Bearer ${refreshed}`,
            },
          });
        }
      }
      return res;
    },
    [accessToken, refreshAccessToken]
  );

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, fetchWithAuth }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => useContext(AuthContext);
