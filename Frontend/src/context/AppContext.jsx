import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../services/authApi";

const AppContext = createContext();

export function AppProvider({ children }) {
  // =========================
  // USER
  // =========================
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // AUTH POPUP
  // =========================
  const [authView, setAuthView] = useState(null);

  // =========================
  // CURRENT APP PAGE
  // =========================
  const [curApp, setCurApp] = useState("dashboard");

  // =========================
  // SCANS
  // =========================
  const [scans, setScans] = useState([]);

  // =========================
  // THEME
  // =========================
  const [theme, setTheme] = useState(
    localStorage.getItem("vidhaan-theme") || "light"
  );

  // =========================
  // TOAST
  // =========================
  const [toastMessage, setToastMessage] = useState("");

  const toast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // =========================
  // THEME
  // =========================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vidhaan-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  };

  // =========================
  // AUTH STATUS
  // =========================
  const isLoggedIn = !!user;
  const isAuthenticated = !!user;

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    const data = await loginUser(email, password);

    setUser(data.user);
    setAuthView(null);
    setCurApp("dashboard");

    toast("Login successful");

    return data;
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (
    name,
    email,
    password,
    org
  ) => {
    const data = await registerUser({
      name,
      email,
      password,
      org,
    });

    setUser(data.user);
    setAuthView(null);
    setCurApp("dashboard");

    toast("Account created successfully");

    return data;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setScans([]);
      setCurApp("dashboard");

      toast("Logged out successfully");
    }
  };

  // =========================
  // GET CURRENT USER
  // =========================
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  // =========================
  // OPEN REPORT
  // =========================
  const openReport = (id) => {
    console.log("Opening report:", id);

    setCurApp("report");
  };

  // =========================
  // CONTEXT
  // =========================
  return (
    <AppContext.Provider
      value={{
        // USER
        user,
        setUser,

        // LOADING
        loading,

        // AUTH
        isLoggedIn,
        isAuthenticated,

        // AUTH FUNCTIONS
        login,
        register,
        logout,

        // AUTH POPUP
        authView,
        setAuthView,

        // NAVIGATION
        curApp,
        setCurApp,

        // SCANS
        scans,
        setScans,
        openReport,

        // THEME
        theme,
        toggleTheme,

        // TOAST
        toast,
        toastMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);