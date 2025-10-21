import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types";
import { encode } from "../lib/encode";
import { fetchSecrets, fetchUserById } from "../services/firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }
    const id = Number(userId);
    fetchUserById(id)
      .then(setUser)
      .catch((error) => {
        console.error("Failed to restore session", error);
        localStorage.removeItem("userId");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email: string, password: string) {
        try {
          const secret = encode(email, password);
          const secrets = await fetchSecrets();
          const id = secrets?.[secret];
          if (id == null) throw new Error("Invalid credentials");

          const user = await fetchUserById(id);
          setUser(user);
          localStorage.setItem("userId", String(user?.id));
        } catch (error) {
          localStorage.removeItem("userId");
          setUser(null);
          throw error;
        }
      },
      logout() {
        setUser(null);
        localStorage.removeItem("userId");
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
