import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../components/Breadcrumbs";
import MainLayout from "../layout/MainLayout";
import { Formik } from "formik";

const Contacts = () => {
  const paths = [
    { url: "/", label: "Home" },
    { url: "/Contact", label: "Contact" },
  ];
  return (
    <>
      <MainLayout>
        <Breadcrumbs paths={paths} titles="Contact"></Breadcrumbs>
        <section className="section">
          <Container>
            <Row>
              <Col>
                <h1>Contact</h1>
                <Formik
                  initialValues={{ name: "jared" }}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                  }}>
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                      />
                      {props.errors.name && (
                        <div id="feedback">{props.errors.name}</div>
                      )}
                      <button type="submit">Submit</button>
                    </form>
                  )}
                  
                </Formik>
              </Col>
            </Row>
          </Container>
        </section>
      </MainLayout>
    </>
  );
};

export default Contacts;
