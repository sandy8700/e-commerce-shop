import { Col, Container, Row } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";
import ProductsItems from "../components/ProductsItems";
import ProductSidebar from "../components/ProductSidebar";
import Breadcrumbs from "../components/Breadcrumbs";

const Shop = () => {
  const paths = [
    { url: "/", label: "Home" },
    { url: "/products", label: "Shop" },
  ];
  return (
    <>
      <MainLayout>
        <Breadcrumbs paths={paths} titles="Shop"></Breadcrumbs>
        <div className="section">
          <Container>
            <Row>
              <Col lg="3">
                <ProductSidebar></ProductSidebar>
              </Col>
              <Col lg="9">
                <ProductsItems></ProductsItems>
              </Col>
            </Row>
          </Container>
        </div>
      </MainLayout>
    </>
  );
};

export default Shop;
