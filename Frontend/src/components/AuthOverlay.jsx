import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useApp } from "../context/AppContext";

function AuthOverlay() {
  const {
    authView,
    setAuthView,
    login,
    register,
  } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authView) return null;

  const isLogin = authView === "login";

  const closeOverlay = () => {
    setAuthView(null);
    setName("");
    setEmail("");
    setPassword("");
    setOrg("");
    setError("");
    setShowPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(email, password);

      closeOverlay();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await register(
        name,
        email,
        password,
        org
      );

      closeOverlay();
    } catch (error) {
  console.log("REGISTER ERROR:", error);

  setError(
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Unable to create your account."
  );
} finally {
      setLoading(false);
    }
  };

  const switchView = () => {
    setError("");
    setShowPassword(false);

    setAuthView(
      isLogin ? "register" : "login"
    );
  };

  return (
    <div className="saas-auth">

      {/* Background */}
      <div className="saas-auth-bg">
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />
      </div>

      {/* Backdrop */}
      <div
        className="saas-auth-backdrop"
        onClick={closeOverlay}
      />

      {/* Card */}
      <div className="saas-auth-card">

        {/* Close */}
        <button
          className="saas-close"
          onClick={closeOverlay}
          type="button"
        >
          <X size={19} />
        </button>

        {/* Left Branding */}
        <div className="saas-auth-brand">

          <div className="brand-orb">
            <Sparkles size={23} />
          </div>

          <span className="brand-name">
            VIDHAAN
          </span>

          <h1>
            Build smarter.
            <br />
            <span>Work better.</span>
          </h1>

          <p>
            A powerful workspace designed to
            simplify your workflow and help your
            team move faster.
          </p>

          <div className="brand-security">
            <ShieldCheck size={17} />

            <span>
              Secure & encrypted
            </span>
          </div>

        </div>

        {/* Right Form */}
        <div className="saas-auth-form-area">

          <div className="auth-top">

            <div className="mobile-logo">
              <div className="mobile-logo-icon">
                <Sparkles size={18} />
              </div>

              <span>VIDHAAN</span>
            </div>

            <div className="auth-heading">

              <span className="auth-eyebrow">
                {isLogin
                  ? "WELCOME BACK"
                  : "GET STARTED"}
              </span>

              <h2>
                {isLogin
                  ? "Sign in to your account"
                  : "Create your account"}
              </h2>

              <p>
                {isLogin
                  ? "Enter your details to continue."
                  : "Create your workspace in less than a minute."}
              </p>

            </div>

          </div>

          {isLogin ? (
            <form
              className="premium-form"
              onSubmit={handleLogin}
            >

              {/* Email */}
              <div className="premium-field">

                <label>Email address</label>

                <div className="premium-input">

                  <Mail size={18} />

                  <input
                    type="email"
                    value={email}
                    placeholder="name@company.com"
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* Password */}
              <div className="premium-field">

                <div className="field-row">

                  <label>Password</label>

                  <button
                    type="button"
                    className="forgot-btn"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="premium-input">

                  <Lock size={18} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {error && (
                <div className="premium-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="premium-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Signing in..."
                    : "Sign in"}
                </span>

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>

            </form>
          ) : (
            <form
              className="premium-form"
              onSubmit={handleRegister}
            >

              {/* Name */}
              <div className="premium-field">

                <label>Full name</label>

                <div className="premium-input">

                  <User size={18} />

                  <input
                    type="text"
                    value={name}
                    placeholder="Manish Zala"
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* Email */}
              <div className="premium-field">

                <label>Email address</label>

                <div className="premium-input">

                  <Mail size={18} />

                  <input
                    type="email"
                    value={email}
                    placeholder="name@company.com"
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* Organization */}
              <div className="premium-field">

                <label>Organization</label>

                <div className="premium-input">

                  <Building2 size={18} />

                  <input
                    type="text"
                    value={org}
                    placeholder="Your company"
                    onChange={(e) =>
                      setOrg(e.target.value)
                    }
                  />

                </div>

              </div>

              {/* Password */}
              <div className="premium-field">

                <label>Password</label>

                <div className="premium-input">

                  <Lock size={18} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {error && (
                <div className="premium-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="premium-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Creating account..."
                    : "Create account"}
                </span>

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>

            </form>
          )}

          {/* Bottom */}
          <div className="auth-bottom">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={switchView}
            >
              {isLogin
                ? "Create free account"
                : "Sign in instead"}
            </button>

          </div>

          <div className="auth-legal">
            By continuing, you agree to our
            <span> Terms</span> and
            <span> Privacy Policy</span>.
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;