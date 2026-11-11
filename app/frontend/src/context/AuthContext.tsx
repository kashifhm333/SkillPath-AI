import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, ApiError } from "../services/api";
import type { User, LearnerProfile } from "../types";

interface AuthContextType {
  user: User | null;
  profile: LearnerProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, goal?: string, fields?: string[]) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<LearnerProfile> & { name?: string }) => Promise<void>;
  refresh: () => Promise<void>;
}

const defaultMockProfile: LearnerProfile = {
  userId: "usr_alex_morgan",
  goal: "Become an AI Engineer",
  fields: ["Artificial Intelligence", "Data Science"],
  level: "Some experience",
  hours: 8,
  learningStyle: "Mixed",
  language: "English",
  ecosystem: "Cloud agnostic",
  operatingSystem: "Linux",
  onboardingComplete: false,
  assessmentScore: 78,
  streakDays: 12,
  lastActiveDate: new Date().toISOString().split("T")[0],
  weeklyMinutes: 275,
  roleReadinessPercent: 31,
};

const defaultMockUser: User = {
  id: "usr_alex_morgan",
  email: "alex@example.com",
  name: "Alex Morgan",
  role: "learner",
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await api.auth.me();
      setUser(res.user);
      setProfile(res.profile);
    } catch {
      // If no valid session exists, check if token in localStorage or use guest
      const token = localStorage.getItem("skillpath_token");
      if (token) {
        setUser(defaultMockUser);
        setProfile(defaultMockProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.auth.login({ email, password });
    localStorage.setItem("skillpath_token", res.token);
    setUser(res.user);
    setProfile(res.profile);
  };

  const register = async (name: string, email: string, password: string, goal?: string, fields?: string[]) => {
    const res = await api.auth.register({ name, email, password, goal, fields });
    localStorage.setItem("skillpath_token", res.token);
    setUser(res.user);
    setProfile(res.profile);
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // ignore logout network errors
    } finally {
      localStorage.removeItem("skillpath_token");
      setUser(null);
      setProfile(null);
    }
  };

  const updateProfile = async (patch: Partial<LearnerProfile> & { name?: string }) => {
    try {
      const res = await api.auth.updateProfile(patch);
      setUser(res.user);
      setProfile(res.profile);
    } catch (err) {
      // Optimistic local update fallback
      if (profile) {
        setProfile({ ...profile, ...patch });
      }
      if (patch.name && user) {
        setUser({ ...user, name: patch.name });
      }
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: profile || defaultMockProfile,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        refresh: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
