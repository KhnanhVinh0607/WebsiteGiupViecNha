import React from "react";
import { Link } from "react-router-dom";

const SectionHeader = ({ title }) => {
  return (
    <div className="section-header">
      <div className="left-side">
        <div className="section-title">
          <h4>{title}</h4>
        </div>
      </div>
      <div className="right-side">
        <Link to="/list-service">Xem tất cả</Link>
      </div>
    </div>
  );
};

export default SectionHeader;
