import React, { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleAlert,
  Inbox,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Mail,
  MessageSquareText,
  Moon,
  PackagePlus,
  Search,
  ShieldCheck,
  Sun,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import { AdminProductsManager } from "./AdminProductsManager";
import { AdminTalentManager } from "./AdminTalentManager";
import { AdminJobsManager } from "./AdminJobsManager";
import { useTheme } from "../context/ThemeContext";
import { apiBaseUrl } from "../services/config";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string | null;
  service: string;
  budget: string;
  timeline: string;
  details: string;
  createdAt: string;
  status?: "new" | "pending_review" | "in_progress" | "completed" | "archived";
};
type Stats = {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
};
const adminApi = `${apiBaseUrl}/admin`;
const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
const statusLabel = (status?: string) =>
  status === "pending_review" ? "New" : (status || "new").replace("_", " ");

export const AdminPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const logoSrc =
    theme === "dark"
      ? "/brand/the-dev-pride-logo-dark.png"
      : "/brand/the-dev-pride-logo-light.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    inProgress: 0,
    completed: 0,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [activeSection, setActiveSection] = useState<
    "overview" | "inquiries" | "products" | "talent" | "jobs"
  >("overview");
  const [storageModeLabel, setStorageModeLabel] = useState("Checking storage");

  const request = useCallback(async (path: string, init?: RequestInit) => {
    const response = await fetch(`${adminApi}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(json.message || "The request could not be completed.");
    return json;
  }, []);

  const refresh = useCallback(async () => {
    const params = new URLSearchParams({ q: search, status: filter });
    const json = await request(`/inquiries?${params}`);
    setInquiries(json.data || []);
    setStats(json.stats || { total: 0, new: 0, inProgress: 0, completed: 0 });
  }, [request, search, filter]);

  useEffect(() => {
    request("/session")
      .then((json) => {
        setEmail(json.data?.email || "");
        setAuthenticated(true);
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
    fetch(`${apiBaseUrl}/health`)
      .then((response) => response.json())
      .then((json) =>
        setStorageModeLabel(
          json.storage === "mongodb"
            ? "MongoDB connected"
            : "Local JSON · Atlas not set",
        ),
      )
      .catch(() => setStorageModeLabel("Storage status unavailable"));
  }, [request]);
  useEffect(() => {
    if (authenticated && activeSection !== "products")
      refresh().catch((error) => setMessage(error.message));
  }, [authenticated, activeSection, refresh]);

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setWorking(true);
    setMessage("");
    try {
      await request("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAuthenticated(true);
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setWorking(false);
    }
  };
  const logout = async () => {
    try {
      await request("/logout", { method: "POST" });
    } finally {
      setAuthenticated(false);
      setInquiries([]);
    }
  };
  const updateStatus = async (item: Inquiry, status: string) => {
    try {
      await request(`/inquiries/${encodeURIComponent(item.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await refresh();
      if (selected?.id === item.id)
        setSelected({ ...item, status: status as Inquiry["status"] });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    }
  };
  const deleteInquiry = async (item: Inquiry) => {
    if (
      !window.confirm(
        `Delete the inquiry from ${item.name}? This cannot be undone.`,
      )
    )
      return;
    try {
      await request(`/inquiries/${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });
      setSelected(null);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  };
  const exportCsv = () => {
    const fields = [
      "name",
      "email",
      "company",
      "phone",
      "service",
      "budget",
      "timeline",
      "status",
      "createdAt",
      "details",
    ] as const;
    const csv = [
      fields.join(","),
      ...inquiries.map((item) =>
        fields
          .map(
            (field) => `"${String(item[field] ?? "").replaceAll('"', '""')}"`,
          )
          .join(","),
      ),
    ].join("\r\n");
    const href = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "dev-pride-inquiries.csv";
    anchor.click();
    URL.revokeObjectURL(href);
  };

  if (checking)
    return (
      <div className="admin-loading">
        <LoaderCircle className="animate-spin" />{" "}
        <span>Opening secure workspace</span>
      </div>
    );
  if (!authenticated)
    return (
      <main className="admin-login-page" data-theme={theme}>
        <div className="admin-login-aside">
          <div className="admin-brand">
            <img
              className={`admin-brand-logo ${theme === "dark" ? "logo-blend-dark" : "logo-blend-light"}`}
              src={logoSrc}
              alt="The Dev Pride Technology"
            />
          </div>
          <div className="admin-login-copy">
            <p className="admin-kicker">PRIVATE WORKSPACE / 01</p>
            <h1>
              Good work
              <br />
              starts with
              <br />
              <em>good attention.</em>
            </h1>
            <p>
              A quieter place to keep track of the conversations that move the
              work forward.
            </p>
          </div>
          <span className="admin-aside-foot">
            THE DEV PRIDE TECHNOLOGY · EST. 2018
          </span>
        </div>
        <div className="admin-login-main">
          <button
            className="admin-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}{" "}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <form className="admin-login-form" onSubmit={submitLogin}>
            <p className="admin-kicker">ADMINISTRATOR ACCESS</p>
            <h2>Welcome back.</h2>
            <p className="admin-login-help">
              Sign in with your administrator account.
            </p>
            <label>
              Email address
              <input
                autoComplete="username"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@company.com"
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter your password"
              />
            </label>
            {message && (
              <p className="admin-error">
                <CircleAlert size={16} />
                {message}
              </p>
            )}
            <button className="admin-submit" disabled={working}>
              {working ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : null}{" "}
              Sign in to workspace <ArrowUpRight size={17} />
            </button>
            <div className="admin-secure-note">
              <ShieldCheck size={15} /> Protected administrator access
            </div>
          </form>
          <a href="/" className="admin-back-link">
            ← Return to the website
          </a>
        </div>
      </main>
    );

  return (
    <div className="admin-shell" data-theme={theme}>
      <aside className="admin-sidebar">
        <a
          href="/"
          className="admin-brand"
          aria-label="The Dev Pride Technology home"
        >
          <img
            className={`admin-brand-logo ${theme === "dark" ? "logo-blend-dark" : "logo-blend-light"}`}
            src={logoSrc}
            alt="The Dev Pride Technology"
          />
        </a>
        <div className="admin-workspace-label">WORKSPACE</div>
        <button
          className={`admin-side-link ${activeSection === "overview" ? "active" : ""}`}
          onClick={() => setActiveSection("overview")}
        >
          <LayoutDashboard size={17} /> Overview
        </button>
        <button
          className={`admin-side-link ${activeSection === "inquiries" ? "active" : ""}`}
          onClick={() => setActiveSection("inquiries")}
        >
          <Inbox size={17} /> Inquiries <span>{stats.new}</span>
        </button>
        <button
          className={`admin-side-link ${activeSection === "talent" ? "active" : ""}`}
          onClick={() => setActiveSection("talent")}
        >
          <UsersRound size={17} /> Applications
        </button>
        <button
          className={`admin-side-link ${activeSection === "jobs" ? "active" : ""}`}
          onClick={() => setActiveSection("jobs")}
        >
          <BriefcaseBusiness size={17} /> Jobs
        </button>
        <button
          className={`admin-side-link ${activeSection === "products" ? "active" : ""}`}
          onClick={() => setActiveSection("products")}
        >
          <PackagePlus size={17} /> Products
        </button>
        <div className="admin-sidebar-bottom">
          <div className="admin-status">
            <span
              className={
                storageModeLabel === "MongoDB connected" ? "connected" : "local"
              }
            />{" "}
            {storageModeLabel}
          </div>
          <button onClick={logout} className="admin-logout">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">
            Workspace <span>/</span>{" "}
            {activeSection === "products"
              ? "Products"
              : activeSection === "talent"
                ? "Applications"
                : activeSection === "jobs"
                  ? "Jobs"
                  : activeSection === "inquiries"
                    ? "Inquiries"
                    : "Overview"}
          </div>
          <div className="admin-topbar-actions">
            <button
              className="admin-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}{" "}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <div className="admin-user">
              <span className="admin-avatar">
                {(email || "A")[0].toUpperCase()}
              </span>
              <span>{email || "Administrator"}</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>
        <div className="admin-content">
          {activeSection === "products" ? (
            <AdminProductsManager request={request} />
          ) : activeSection === "talent" ? (
            <AdminTalentManager request={request} />
          ) : activeSection === "jobs" ? (
            <AdminJobsManager request={request} />
          ) : (
            <>
              <div className="admin-heading-row">
                <div>
                  <p className="admin-kicker">
                    {new Date()
                      .toLocaleDateString("en", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </p>
                  <h1>
                    {activeSection === "inquiries"
                      ? "Project inquiries."
                      : "Good to see you."}
                  </h1>
                  <p className="admin-subtitle">
                    Here’s what’s happening with your project inquiries.
                  </p>
                </div>
                <button className="admin-export" onClick={exportCsv}>
                  <ArrowDownToLine size={16} /> Export CSV
                </button>
              </div>
              {message && (
                <div className="admin-notice">
                  <CircleAlert size={16} />
                  {message}
                  <button onClick={() => setMessage("")} aria-label="Dismiss">
                    <X size={15} />
                  </button>
                </div>
              )}
              <div className="admin-stats">
                <article>
                  <span className="admin-stat-icon">
                    <MessageSquareText size={18} />
                  </span>
                  <p>Total inquiries</p>
                  <strong>{stats.total}</strong>
                  <small>All time</small>
                </article>
                <article>
                  <span className="admin-stat-icon amber">
                    <Inbox size={18} />
                  </span>
                  <p>Needs attention</p>
                  <strong>{stats.new}</strong>
                  <small>New inquiries</small>
                </article>
                <article>
                  <span className="admin-stat-icon blue">
                    <Activity size={18} />
                  </span>
                  <p>In progress</p>
                  <strong>{stats.inProgress}</strong>
                  <small>Being reviewed</small>
                </article>
                <article>
                  <span className="admin-stat-icon green">
                    <Check size={18} />
                  </span>
                  <p>Completed</p>
                  <strong>{stats.completed}</strong>
                  <small>Closed inquiries</small>
                </article>
              </div>
              <section className="admin-table-card">
                <div className="admin-table-heading">
                  <div>
                    <h2>Project inquiries</h2>
                    <p>Review and manage incoming conversations.</p>
                  </div>
                  <div className="admin-filters">
                    <label className="admin-search">
                      <Search size={16} />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search inquiries"
                      />
                    </label>
                    <select
                      aria-label="Filter by status"
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
                    >
                      <option value="all">All statuses</option>
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>CONTACT</th>
                        <th>SERVICE</th>
                        <th>RECEIVED</th>
                        <th>STATUS</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((item) => (
                        <tr key={item.id} onClick={() => setSelected(item)}>
                          <td>
                            <div className="admin-contact-cell">
                              <span className="admin-contact-avatar">
                                {item.name?.slice(0, 1).toUpperCase()}
                              </span>
                              <span>
                                <strong>{item.name}</strong>
                                <small>
                                  {item.company} · {item.email}
                                </small>
                              </span>
                            </div>
                          </td>
                          <td>{item.service}</td>
                          <td>{dateLabel(item.createdAt)}</td>
                          <td>
                            <span
                              className={`admin-status-pill ${statusLabel(item.status).replace(" ", "-")}`}
                            >
                              {statusLabel(item.status)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="admin-row-open"
                              aria-label={`View ${item.name}'s inquiry`}
                            >
                              <ArrowUpRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!inquiries.length && (
                    <div className="admin-empty">
                      <Inbox size={28} />
                      <strong>No inquiries found</strong>
                      <span>Try changing the search or status filter.</span>
                    </div>
                  )}
                </div>
                <div className="admin-table-footer">
                  Showing {inquiries.length}{" "}
                  {inquiries.length === 1 ? "inquiry" : "inquiries"}
                  <span>Updates are saved automatically</span>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
      {selected && (
        <div
          className="admin-drawer-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <aside className="admin-drawer">
            <div className="admin-drawer-head">
              <div>
                <p className="admin-kicker">PROJECT INQUIRY</p>
                <h2>{selected.name}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close inquiry"
              >
                <X />
              </button>
            </div>
            <p className="admin-drawer-company">
              {selected.company} · Received {dateLabel(selected.createdAt)}
            </p>
            <div className="admin-detail-grid">
              <div>
                <small>EMAIL</small>
                <a href={`mailto:${selected.email}`}>
                  <Mail size={14} />
                  {selected.email}
                </a>
              </div>
              <div>
                <small>SERVICE</small>
                <strong>{selected.service}</strong>
              </div>
              <div>
                <small>BUDGET</small>
                <strong>{selected.budget}</strong>
              </div>
              <div>
                <small>TIMELINE</small>
                <strong>{selected.timeline}</strong>
              </div>
              {selected.phone && (
                <div>
                  <small>PHONE</small>
                  <strong>{selected.phone}</strong>
                </div>
              )}
            </div>
            <section className="admin-message">
              <small>PROJECT DETAILS</small>
              <p>{selected.details}</p>
            </section>
            <label className="admin-status-edit">
              Update status
              <select
                value={
                  selected.status === "pending_review"
                    ? "new"
                    : selected.status || "new"
                }
                onChange={(event) => updateStatus(selected, event.target.value)}
              >
                <option value="new">New</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <button
              className="admin-delete"
              onClick={() => deleteInquiry(selected)}
            >
              <Trash2 size={16} /> Delete inquiry
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
