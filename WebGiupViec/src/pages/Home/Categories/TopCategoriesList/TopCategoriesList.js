import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const TopCategoriesList = ({ categories }) => {
  return (
    <div className="top-categories-list">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h4>Danh Mục Nổi Bật Trong Tháng</h4>
          </div>
        </div>
      </div>
      <div className="categories-wrapper">
        <Row>
          {categories.map((item) => (
            <Col key={item.id} lg={2} md={2} sm={2} xs={2}> 
              <Link to={`/list-service`}>
                <div className="category-item">
                  <div className="category-img">
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: "168px",
                        height: "168px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="category-title">
                    <h6>{item.title}</h6>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopCategoriesList;
