import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const auth = getAuth(firebaseApp);

const SignUp = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }else if (!passwordRegex.test(values.password)) {
      errors.password = "Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      console.log(response.user);
      setIsSubmit(true);
      setTimeout(() => {
        setIsSubmit(false);
        navigate("/admin/dashboard");
      }, 5000);
    } catch (error) {
      setFormErrors(validate(formValues));
    }
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
            {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="alert alert-success">Signed up successfully</div>
              ) : (
                <div></div>
            )}
              <form onSubmit={handleSignUp}>
                <h2 className="text-center">Register</h2>
                <p className="text-center mb-3">
                  Please fill in this form to create an account.
                </p>
                <div className="form-outline mb-3">
                  {/* <label className="form-label">Email address</label> */}
                  <input
                    style={{ padding: "11px 15px" }}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    value={formValues.email}
                  />
                </div>
                <p style={{ color: "red", marginTop: 5 }}>{formErrors.email}</p>
                <div className="mb-3">
                  {/* <label className="form-label">Password</label> */}
                  <div className="input-group">
                    <input
                      style={{ padding: "11px 15px" }}
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      value={formValues.password}
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
                  <p style={{ color: "red", marginTop: 5 }}>
                    {formErrors.password}
                  </p>
                </div>
                <button
                  className="btn gradient-custom-3 px-5 py-2 w-100 fw-bold mt-4"
                  type="submit">
                  Register
                </button>
                <p className="text-center text-muted mt-4 mb-0">
                  Have already an account?{" "}
                  <Link to="/login" className="fw-bold text-body">
                    <u>Login</u>
                  </Link>
                </p>
                {/* {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>} */}
                {/* {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
