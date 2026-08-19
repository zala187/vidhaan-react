import React from "react";
import { useApp } from "../../context/AppContext";
import { riskColorOf } from "../../utils/scanEngine";
import { timeAgo } from "../../utils/helpers";

export default function Dashboard() {
  const { user, scans = [], setCurApp, openReport } = useApp();

  const safeScans = Array.isArray(scans) ? scans : [];

  const avgScore = safeScans.length
    ? Math.round(
        safeScans.reduce((total, scan) => total + Number(scan.score || 0), 0) /
          safeScans.length
      )
    : 0;

  const critical = safeScans.filter(
    (scan) => Number(scan.score || 0) < 30
  ).length;

  const websites = new Set(
    safeScans.map((scan) => scan.domain).filter(Boolean)
  ).size;

  const recentScans = [...safeScans]
    .sort(
      (a, b) =>
        new Date(b.scannedAt || 0) - new Date(a.scannedAt || 0)
    )
    .slice(0, 5);

  const firstName = user?.name?.split(" ")[0] || "there";

  const kpis = [
    {
      label: "Compliance Score",
      value: avgScore,
      suffix: "/100",
      icon: "✦",
      className: "kpi-indigo",
      trend: safeScans.length ? "+8.4%" : "—",
      trendText: "vs last period",
    },
    {
      label: "Total Scans",
      value: safeScans.length,
      icon: "◉",
      className: "kpi-cyan",
      trend: safeScans.length ? "+12%" : "—",
      trendText: "this month",
    },
    {
      label: "Websites Monitored",
      value: websites,
      icon: "◎",
      className: "kpi-violet",
      trend: "Active",
      trendText: "monitoring",
    },
    {
      label: "Critical Alerts",
      value: critical,
      icon: "△",
      className: "kpi-red",
      trend: critical ? "Attention" : "Clear",
      trendText: critical ? "needs review" : "all clear",
    },
  ];

  const riskData = [
    {
      label: "Excellent",
      value: safeScans.filter((s) => s.risk === "Excellent").length,
      className: "risk-excellent",
    },
    {
      label: "Mostly Compliant",
      value: safeScans.filter((s) => s.risk === "Mostly Compliant").length,
      className: "risk-good",
    },
    {
      label: "Needs Improvement",
      value: safeScans.filter((s) => s.risk === "Needs Improvement").length,
      className: "risk-warning",
    },
    {
      label: "High Risk",
      value: safeScans.filter((s) => s.risk === "High Risk").length,
      className: "risk-high",
    },
    {
      label: "Critical",
      value: safeScans.filter((s) => s.risk === "Critical").length,
      className: "risk-critical",
    },
  ];

  const totalRisk = riskData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="premium-dashboard">

      {/* ================= HEADER ================= */}

      <header className="dashboard-header">

        <div>
          <div className="dashboard-eyebrow">
            <span className="eyebrow-dot" />
            COMPLIANCE WORKSPACE
          </div>

          <h1>
            Good morning, <span>{firstName}</span>
            <span className="wave">👋</span>
          </h1>

          <p>
            Monitor your website compliance and keep your digital
            presence secure.
          </p>
        </div>

        <button
          className="premium-primary-btn"
          onClick={() => setCurApp("scanner")}
        >
          <span>✦</span>
          Run New Scan
          <span className="btn-arrow">→</span>
        </button>

      </header>


      {/* ================= KPI ================= */}

      <section className="premium-kpi-grid">

        {kpis.map((item) => (
          <div
            className={`premium-kpi ${item.className}`}
            key={item.label}
          >

            <div className="kpi-glow" />

            <div className="kpi-icon">
              {item.icon}
            </div>

            <div className="kpi-content">

              <div className="kpi-label">
                {item.label}
              </div>

              <div className="kpi-value">
                {item.value}

                {item.suffix && (
                  <small>{item.suffix}</small>
                )}
              </div>

              <div className="kpi-footer">

                <span className="kpi-trend">
                  {item.trend}
                </span>

                <span>
                  {item.trendText}
                </span>

              </div>

            </div>

          </div>
        ))}

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="dashboard-main-grid">

        {/* SCORE CARD */}

        <div className="premium-card score-card">

          <div className="premium-card-header">

            <div>
              <div className="card-kicker">
                PERFORMANCE
              </div>

              <h2>Compliance overview</h2>

              <p>
                Your overall website compliance performance.
              </p>
            </div>

            <div className="period-pill">
              Last 30 days
              <span>⌄</span>
            </div>

          </div>


          <div className="score-area">

            <div className="score-ring">

              <div className="score-ring-inner">
                <strong>{avgScore}</strong>
                <span>/ 100</span>
              </div>

            </div>


            <div className="score-details">

              <div className="score-status">
                <span className="status-dot" />

                {avgScore >= 80
                  ? "Excellent compliance"
                  : avgScore >= 60
                  ? "Mostly compliant"
                  : "Needs improvement"}
              </div>

              <p>
                {safeScans.length
                  ? "Your latest scans are being tracked across your workspace."
                  : "Run your first scan to start measuring your compliance score."}
              </p>

              <button
                className="text-action"
                onClick={() => setCurApp("scanner")}
              >
                Scan a website
                <span>→</span>
              </button>

            </div>

          </div>

        </div>


        {/* RISK CARD */}

        <div className="premium-card risk-card">

          <div className="premium-card-header">

            <div>
              <div className="card-kicker">
                RISK ANALYSIS
              </div>

              <h2>Risk distribution</h2>

              <p>
                Findings across your scanned websites.
              </p>
            </div>

          </div>


          <div className="risk-content">

            <div className="risk-circle">

              <div>
                <strong>{totalRisk}</strong>
                <span>scans</span>
              </div>

            </div>


            <div className="risk-list">

              {riskData.map((item) => {

                const percentage = totalRisk
                  ? Math.round((item.value / totalRisk) * 100)
                  : 0;

                return (
                  <div className="risk-item" key={item.label}>

                    <div className="risk-item-top">

                      <div>
                        <span
                          className={`risk-dot ${item.className}`}
                        />

                        {item.label}
                      </div>

                      <strong>{item.value}</strong>

                    </div>

                    <div className="risk-bar">
                      <span
                        className={item.className}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* ================= RECENT SCANS ================= */}

      <section className="premium-card recent-card">

        <div className="premium-card-header">

          <div>
            <div className="card-kicker">
              ACTIVITY
            </div>

            <h2>Recent scans</h2>

            <p>
              Your latest website compliance activity.
            </p>
          </div>

          <button
            className="outline-action"
            onClick={() => setCurApp("history")}
          >
            View all
            <span>→</span>
          </button>

        </div>


        {recentScans.length > 0 ? (

          <div className="premium-scan-list">

            {recentScans.map((scan) => (

              <div
                className="premium-scan-row"
                key={scan.id}
                onClick={() => openReport?.(scan.id)}
              >

                <div className="site-icon">
                  ◎
                </div>

                <div className="site-info">

                  <strong>
                    {scan.domain || "Unknown website"}
                  </strong>

                  <span>
                    {timeAgo(scan.scannedAt)} · Website scan
                  </span>

                </div>

                <div className="scan-risk">

                  <span
                    className="scan-risk-label"
                    style={{
                      color: riskColorOf(scan.risk),
                    }}
                  >
                    {scan.risk || "Unknown"}
                  </span>

                  <strong>
                    {scan.score ?? 0}
                  </strong>

                </div>

                <span className="row-arrow">
                  →
                </span>

              </div>

            ))}

          </div>

        ) : (

          <div className="premium-empty">

            <div className="empty-orb">
              ✦
            </div>

            <h3>
              Your workspace is ready
            </h3>

            <p>
              Run your first website scan and we'll analyze
              compliance, risks and important findings.
            </p>

            <button
              className="premium-primary-btn"
              onClick={() => setCurApp("scanner")}
            >
              <span>✦</span>
              Scan Your First Website
              <span className="btn-arrow">→</span>
            </button>

          </div>

        )}

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-action-grid">

        <button
          className="quick-action"
          onClick={() => setCurApp("scanner")}
        >
          <span className="quick-icon">◎</span>

          <span>
            <strong>Run a scan</strong>
            <small>Analyze a new website</small>
          </span>

          <span className="quick-arrow">→</span>
        </button>


        <button
          className="quick-action"
          onClick={() => setCurApp("reports")}
        >
          <span className="quick-icon">▤</span>

          <span>
            <strong>View reports</strong>
            <small>Explore your compliance reports</small>
          </span>

          <span className="quick-arrow">→</span>
        </button>


        <button
          className="quick-action"
          onClick={() => setCurApp("settings")}
        >
          <span className="quick-icon">⚙</span>

          <span>
            <strong>Workspace settings</strong>
            <small>Manage your preferences</small>
          </span>

          <span className="quick-arrow">→</span>
        </button>

      </section>

    </div>
  );
}