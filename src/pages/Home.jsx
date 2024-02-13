import React from "react";
import MainLayout from "../layout/MainLayout";
import { Col, Container, Row } from "react-bootstrap";
// import SingleProduct from "../components/SingleProduct";
import ProductsItems from "../components/ProductsItems";

const Home = () => {
    return <>
        <MainLayout>
            <Container>
                <Row>
                    <Col md="12">
                      <ProductsItems></ProductsItems>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    </> 
};
export default Home;