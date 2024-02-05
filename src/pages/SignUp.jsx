import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { Link } from "react-router-dom";

const auth = getAuth(firebaseApp);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) =>
      alert("SignUp Successfully")
    );
  };

  const signUpStyle = {
    padding: "40px",
    margin: "100px auto",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "10px",
  };
  return (
    <div
      className="signUpSection d-flex align-items-center h-100 vh-100 gradient-custom-3"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12">
            <div style={signUpStyle}>
              <h2 className="text-center">Register</h2>
              <p className="text-center mb-3">Please fill in this form to create an account.</p>
              <div className="form-outline mb-3">
                {/* <label className="form-label">Email address</label> */}
                <input
                  style={{ padding: "11px 15px" }}
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                {/* <label className="form-label">Password</label> */}
                <div className="input-group">
                  <input
                    style={{ padding: "11px 15px" }}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <span
                    style={{ padding: "11px 15px" }}
                    className="input-group-text"
                    onClick={() => setShowPassword(!showPassword)}>
                    <i
                      className={
                        showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      }></i>
                  </span>
                </div>
              </div>
              <button
                className="btn gradient-custom-3 px-5 py-2 w-100 fw-bold mt-4"
                type="button"
                onClick={createUser}>
                Register
              </button>
              <p className="text-center text-muted mt-4 mb-0">
                Have already an account? <Link to="/login" className="fw-bold text-body">
                  <u>Login</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
