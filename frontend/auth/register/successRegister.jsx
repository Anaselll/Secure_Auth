import { useSearchParams, useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Retrieve the 'status' query parameter
  const status = searchParams.get("status");

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div
          className={`card-header text-center ${
            status === "verified" ? "bg-success" : "bg-danger"
          } text-white`}
        >
          <h4>
            {status === "verified"
              ? "Email Verified Successfully"
              : "Verification Failed"}
          </h4>
        </div>
        <div className="card-body text-center">
          {status === "verified" ? (
            <>
              <p className="mb-4">
                Congratulations! Your email has been successfully verified.
              </p>
              <p className="text-muted">
                You can now log in to your account and start exploring.
              </p>
              <button
                onClick={() => navigate("/auth/login")}
                className="btn btn-primary w-100"
              >
                Go to Login
              </button>
            </>
          ) : (
            <>
              <p className="mb-4">Oops! Something went wrong.</p>
              <p className="text-muted">
                Please try verifying your email again or contact support if the
                issue persists.
              </p>
              <button
                onClick={() => navigate("/auth/register")}
                className="btn btn-warning w-100"
              >
                Register Again
              </button>
            </>
          )}
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">
            {status === "verified"
              ? "Welcome to our platform!"
              : "Need help? Contact support."}
          </small>
        </div>
      </div>
    </div>
  );
}
