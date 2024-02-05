import { Container, Row, Col } from "react-bootstrap";
import Filters from "../components/Filters";
import SingleProduct from "../components/SingleProduct";
import { CartState } from "../context/Context";
import MainLayout from "../layout/MainLayout";

const Shop = () => {
  // const cartStateResult = CartState() || {};
  // const {
  //   state: { products },
  //   productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  // } = cartStateResult;
  const cartStateResult = CartState() || {};
  const {
    state: { products } = { products: [] },
    productState: {
      sort = "default",
      byStock = false,
      byFastDelivery = false,
      byRating = 0,
      searchQuery = "",
    } = {},
  } = cartStateResult;

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <>
      <MainLayout>
        <Container>
          <Row>
            <Col lg="4">
              <Filters />
            </Col>
            <Col lg="8">
              <div className="productContainer">
                {transformProducts().map((prod) => (
                  <SingleProduct prod={prod} key={prod.id} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </>
  );
};

export default Shop;
