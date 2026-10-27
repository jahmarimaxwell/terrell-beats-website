
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/me`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to check login");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function logout() {
    const response = await fetch(
      `${API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    if (!response.ok) {
      throw new Error("Sign out failed");
    }

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
