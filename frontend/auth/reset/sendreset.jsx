import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  let { token } = useParams();
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/auth/reset/password/store/${token}`, {
        newPassword: password,
      })
      .then(() => {
        alert("Password Reset Successfully");
      })
      .catch(() => {
        alert("Password Reset Failed");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-center mb-4">Reset Password</h2>
              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Confirm New Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
