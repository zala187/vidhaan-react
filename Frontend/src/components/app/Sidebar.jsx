import React from "react";
import Logo from "../Logo";
import { useApp } from "../../context/AppContext";

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { p: "dashboard", ic: "▦", t: "Dashboard" },
      { p: "scanner", ic: "◎", t: "Scanner" },
      { p: "history", ic: "☰", t: "Scan History" },
      { p: "reports", ic: "▤", t: "Reports" },
    ],
  },

  {
    label: "Account",
    items: [
      { p: "settings", ic: "⚙", t: "Settings" },
      { p: "profile", ic: "◍", t: "Profile" },
    ],
  },

  {
    label: "System",
    items: [
      { p: "admin", ic: "◈", t: "Admin Panel" },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  const {
    curApp,
    setCurApp,
    user,
    logout,
  } = useApp();

  // Safe user data
  const name = user?.name || "User";
  const email = user?.email || "";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function go(page) {
    setCurApp(page);

    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sb-scrim${open ? " on" : ""}`}
        onClick={onClose}
      />

      <aside className={`sb${open ? " open" : ""}`}>

        {/* Logo */}
        <div className="sb-top">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="sb-nav">

          {NAV_GROUPS.map((group) => (
            <React.Fragment key={group.label}>

              <div className="sb-grp">
                {group.label}
              </div>

              {group.items.map((item) => (
                <div
                  key={item.p}
                  className={`sbi${
                    curApp === item.p ? " on" : ""
                  }`}
                  onClick={() => go(item.p)}
                >
                  <span className="sbi-ic">
                    {item.ic}
                  </span>

                  {item.t}
                </div>
              ))}

            </React.Fragment>
          ))}

        </nav>

        {/* User section */}
        <div className="sb-bottom">

          <div
            className="sb-user"
            onClick={() => go("profile")}
          >

            <div className="sb-uav">
              {initials}
            </div>

            <div
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </div>

              <div
                style={{
                  fontSize: 10.5,
                  color: "var(--ink4)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email}
              </div>
            </div>

          </div>

          {/* Logout */}
          <button
            type="button"
            className="btn btn-outline btn-sm btn-block"
            style={{ marginTop: 10 }}
            onClick={logout}
          >
            Log out
          </button>

        </div>

      </aside>
    </>
  );
}