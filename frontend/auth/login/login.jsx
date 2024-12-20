import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const redirect = useNavigate();

  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post("http://localhost:5000/auth/login", user)
      .then((res) => {
        alert("User successfully logged in");
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        redirect("/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="card-header text-center">
          <h4 className="mb-0">Login</h4>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={user.gmail}
                onChange={(e) => setUser({ ...user, gmail: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <button
            onClick={() => redirect("/forget/password")}
            className="btn btn-link p-0"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => redirect("/auth/register")}
            className="btn btn-link p-0"
          >
         register?
          </button>
        </div>
      </div>
    </div>
  );
}
