import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Goes one step back in the history
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        username,
        password,
        role,
      });
      setError(""); // Clear any previous error
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setSuccessMessage(""); // Clear any previous success message
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-form">
      <h2>Register form</h2>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit">Register</button>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default Register;
