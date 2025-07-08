import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const unameRef = useRef();
  const pwdRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showForgotBox, setShowForgotBox] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (unameRef.current) {
      unameRef.current.focus();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const inputUsername = unameRef.current.value.trim();
    const inputPassword = pwdRef.current.value.trim();

    const stored = JSON.parse(sessionStorage.getItem("registeredUser") || "null");
    if (stored && stored.username === inputUsername && stored.password === inputPassword) {
      sessionStorage.setItem("islogin", "yes");
      sessionStorage.setItem("user", JSON.stringify(stored));
      window.location = "/profile";
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: inputUsername,
        password: inputPassword,
      });

      const { token, ...user } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("islogin", "yes");
      window.location = "/profile";
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg("Username or password incorrect.");
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password/send-otp", {
        email: forgotEmail,
      });
      if (res.data.success) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      } else {
        setMessage(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setMessage("Error sending OTP.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password/reset", {
        email: forgotEmail,
        otp,
        newPassword,
      });
      if (res.data.success) {
        alert("Password reset successfully.");
        setShowForgotBox(false);
      } else {
        setMessage(res.data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h2 className="login-heading">Login</h2>
        {errorMsg && <p className="login-error">{errorMsg}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" ref={unameRef} required className="login-input" />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={pwdRef}
              required
              className="login-input"
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
            <p onClick={() => setShowForgotBox(true)} className="forgot-link">Forgot password?
            </p>

          <button type="submit" className="login-button">Login</button>

  
            <p className="login-register-link">
              New customer? <Link to="/register">Start here</Link>
            </p>
        </form>
      </div>

      {showForgotBox && (
        <div className="forgot-overlay">
          <div className="forgot-box">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter Registered Email"
              // value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                 <div className="password-wrapper">
                <input
                   type={showPassword ? "text" : "password"}
                   placeholder="Enter New Password"
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                   />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
                   </div>
              </>
            )}
            <div className="forgot-buttons">
              {!otpSent ? (
                <button onClick={handleSendOtp}>Send OTP</button>
              ) : (
                <button onClick={handleResetPassword}>Reset Password</button>
              )}
              <button onClick={() => setShowForgotBox(false)}>Cancel</button>
            </div>
            {message && <p className="login-error">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
