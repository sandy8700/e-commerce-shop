import { firebaseApp } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { CartState } from "../context/Context";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";

const auth = getAuth(firebaseApp);

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const signOutAndRedirect = async () => {
    try {
      await signOut(auth);

      // Redirect to the home page
      navigate("/login");
    } catch (error) {
      console.error("Sign Out Error:", error.message);
      // Handle sign-out errors if needed
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const cartState = CartState();
  const { state, dispatch, productDispatch } = cartState || {
    state: {},
    dispatch: () => {},
    productDispatch: () => {},
  };

  const { cart } = state;
  // const { state: { cart }, dispatch, productDispatch } = CartState();
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{
          height: "100px",
          borderTop: "4px solid #007cc2",
        }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="img-fluid"
                style={{ width: "100px" }}
              />
            </Link>
          </Navbar.Brand>

          <Nav>
            <Nav.Link href="/" px="2">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

            <Dropdown alignRight>
              <Dropdown.Toggle variant="">
                <FaShoppingCart color="black" fontSize="25px" />
                <Badge className="bg-success">{cart?.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart?.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                        <img
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.name}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>₹ {prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {user === null ? (
              <>
                <Nav.Link href="/login" className="custom-primary mx-3">Login</Nav.Link>
                <Nav.Link href="/register" className="custom-primary ">Register</Nav.Link>
              </>
            ) : (
              <button
                className="btn btn-danger mx-3"
                onClick={signOutAndRedirect}>
                Logout
              </button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Navigation;
