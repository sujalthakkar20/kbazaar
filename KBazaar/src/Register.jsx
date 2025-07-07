import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [firstName, setFirstName]       = useState("");
  const [lastName, setLastName]         = useState("");
  const [username, setUsername]         = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [gender, setGender]             = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg]         = useState("");
  const fnameRef = useRef(null);


  const navigate = useNavigate();

  useEffect(() => {
    if (fnameRef.current) {
      fnameRef.current.focus();
    }
  }, []);


  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        firstName,
        lastName,
        username,
        email,
        password,
        gender
      });

      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response?.status === 409) {
        setErrorMsg("Username or email already exists.");
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-box">
        <h2 className="register-heading">Register</h2>

        {errorMsg && <p className="register-error">{errorMsg}</p>}

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            required
            className="register-input"
             ref={fnameRef} 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="register-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            required
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="gender-wrapper">
            <label className="gender-label">Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="register-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="register-button">Register</button>

          <p className="register-login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
