import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { Link } from "react-router-dom";

const auth = getAuth(firebaseApp);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending reset email", error);
    }
  };

  const ForgotStyle = {
    padding: "40px",
    margin: "100px auto",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "10px",
  };
  return (
    <>
      <div
        className="loginSection d-flex align-items-center h-100 vh-100 gradient-custom-3"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12">
              <div style={ForgotStyle}>
                <div className="text-center ">
                  <h2 style={{ marginBottom: "15px" }}>Forgot Password</h2>
                </div>
                {resetSent ? (
                  <p className="text-center text-muted">
                    Password reset email sent. Check your email.
                  </p>
                ) : (
                  <>
                    <p>
                      Enter your email and we'll send you a link to reset your
                      password .
                    </p>
                    <input
                      style={{ padding: "11px 15px" }}
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="btn gradient-custom-3 px-5 py-2 w-100 fw-bold mt-3"
                      onClick={handleForgotPassword}>
                      Reset Password
                    </button>
                    <Link
                      to="/login"
                      className="text-center pt-4 d-block text-decoration-none fw-bold d-flex align-items-center justify-content-center text-black">
                      <i className="fa fa-angle-left me-2" style={{fontSize: "22px"}}></i>Back to Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
