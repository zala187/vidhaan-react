import React from "react";

import {
  AppProvider,
  useApp,
} from "./context/AppContext";

import PublicSite from "./components/public/PublicSite";
import AppShell from "./components/app/AppShell";
import AuthOverlay from "./components/AuthOverlay";
import Toast from "./components/Toast";

function Shell() {
  const {
    isLoggedIn,
    loading,
  } = useApp();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <AppShell />
      ) : (
        <PublicSite />
      )}

      <AuthOverlay />

      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}