import axios from "axios";
import { useState } from "react";

export default function Forget() {
  const [email, setEmail] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/forget-password", { email })
      .then(() => {
        alert("Password reset link sent to your email!");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
