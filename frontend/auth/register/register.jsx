import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    gmail: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinimumLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasMinimumLength)
      return "Password must be at least 8 characters long.";
    if (!hasUpperCase)
      return "Password must include at least one uppercase letter.";
    if (!hasLowerCase)
      return "Password must include at least one lowercase letter.";
    if (!hasNumber) return "Password must include at least one number.";
    if (!hasSpecialChar)
      return "Password must include at least one special character.";
    return "";
  };

  const validateForm = () => {
    if (
      !user.username ||
      !user.gmail ||
      !user.password ||
      !user.passwordConfirm
    ) {
      setError("All fields are required");
      return false;
    }

    if (!validateEmail(user.gmail)) {
      setError("Please enter a valid email address");
      return false;
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    if (user.password !== user.passwordConfirm) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    axios
      .post("http://localhost:5000/auth/register", user)
      .then(() => {
        setSuccess(
          "Registration successful! A verification email has been sent to your email address. Please verify your email to activate your account."
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      })
      .catch(({ message }) => {
        console.log(message);
        setError("Error while registering. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="card-header text-center">
          <h4 className="mb-0">Register</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="gmail">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="gmail"
                name="gmail"
                value={user.gmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                value={user.passwordConfirm}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">
            Already have an account? <a href="/auth/login">Login here</a>
          </small>
        </div>
      </div>
    </div>
  );
}
