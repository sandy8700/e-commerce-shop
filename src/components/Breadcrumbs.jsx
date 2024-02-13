import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ paths, titles }) => {
  const breadcrumbStyle = {
    margin: "10px 0",
  };

  return (
    <>
      <section
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
          padding: "30px 0px",
          height: "200px",
          display: "flex",
          alignItems: "center",
        }}>
        <Container className="text-center">
          <h1 className="title-bread">{titles}</h1>
          <Breadcrumb style={breadcrumbStyle}>
          {paths.map((path, index) => (
            <Breadcrumb.Item
              key={index}
              linkAs={Link}
              linkProps={{ to: path.url }}>
              {path.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        </Container>
      </section>
      
    </>
  );
};

export default Breadcrumbs;
