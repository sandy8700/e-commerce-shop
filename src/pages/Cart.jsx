import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "../components/Rating";
import MainLayout from "../layout/MainLayout";
import Breadcrumbs from "../components/Breadcrumbs";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  const paths = [
    { url: "/", label: "Home" },
    { url: "/cart", label: "Cart" },
  ];
  return (
    <MainLayout>
      <Breadcrumbs paths={paths} titles="Cart"></Breadcrumbs>
      <div className="section">
        <Container>
          <Row>
            <Col lg="8">
              {/* <div className="productContainer"> */}
              <ListGroup>
                {cart.map((prod) => (
                  <ListGroup.Item key={prod.id}>
                    <Row>
                      <Col md={2}>
                        <Image src={prod.image} alt={prod.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <span>{prod.name}</span>
                      </Col>
                      <Col md={2}>₹ {prod.price}</Col>
                      <Col md={2}>
                        <Rating rating={prod.ratings} />
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={prod.qty}
                          onChange={(e) =>
                            dispatch({
                              type: "CHANGE_CART_QTY",
                              payload: {
                                id: prod.id,
                                qty: e.target.value,
                              },
                            })
                          }>
                          {[...Array(prod.inStock).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }>
                          <AiFillDelete fontSize="20px" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                {cart.length !== 0 ? null : (
                  <ListGroup.Item>No items</ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            {/* </div> */}
            <Col lg="4">
              <div className="filters ">
                <span className="title">Subtotal ({cart.length}) items</span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>
                  Total: ₹ {total}
                </span>
                <Button type="button" disabled={cart.length === 0}>
                  Proceed to Checkout
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Cart;
