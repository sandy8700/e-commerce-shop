import { useState } from "react";
import {
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../firebase";
import { Link } from "react-router-dom";
import signLogo from "../assets/signinwidthGoogle.png";
import { useNavigate } from "react-router-dom";
// import { auth } from '../firebase';

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      setSuccessMessage("SignIn successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/admin/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error.user);

      setError("Email and password are incorrect");
      setTimeout(() => {
        setError("");
      }, 8000);
    }
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const loginStyle = {
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
              <div style={loginStyle}>
                <div className="text-center mb-5">
                  <h2>LogIn</h2>
                  <p>Please login to your account</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <input
                      style={{ padding: "11px 15px" }}
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="mb-3">
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
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none text-end d-inline float-end">
                    Forgot Password?
                  </Link>
                  <button
                    className="btn gradient-custom-3 px-5 py-2 w-100 fw-bold mt-3"
                    type="submit"
                    disabled={!validateForm()}>
                    Login
                  </button>
                </form>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )}
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <p className="text-center text-muted mt-4 mb-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="fw-bold text-body">
                    <u>Register</u>
                  </Link>
                </p>
                <div className="text-center text-muted">
                  <p style={{ fontWeight: "700" }}>Or</p>
                  <button onClick={SignInWithGoogle} className="btn">
                    <img
                      src={signLogo}
                      alt="SignIn with Google"
                      height="50px"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
