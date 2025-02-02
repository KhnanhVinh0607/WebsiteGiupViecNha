import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChevronRight } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { ShowSidebarCategories } from "../../../redux/actions/primaryActions";
import { getAllCategories } from "../../../services/categoryService";

const Department = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(1, 1000);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCloseCategories = (e) => {
    dispatch(ShowSidebarCategories(false));
  };

  if (loading) {
    return <div>Đang tải danh mục...</div>;
  }

  return (
    <div className="department d-flex">
      <div className="icon">
        <span>
          <GiHamburgerMenu color="#ffffff" />
        </span>
      </div>

      <div className="text" style={{ color: "#ffffff" }}>
        <h6>Danh mục dịch vụ</h6>
      </div>
      <div className="title" style={{ color: "#ffffff" }}>
        <h6>Danh mục dịch vụ</h6>
        <button type="button" onClick={handleCloseCategories}>
          ✕
        </button>
      </div>
      {/* ===== Departments ===== */}
      <ul
        className="departments"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#cccccc transparent",
        }}
      >
        {categories.map((item) =>
          item.submenu ? (
            <li key={item._id}>
              <Link
                to="/list-service"
                onClick={handleCloseCategories}
                className="d-flex justify-content-between"
              >
                <p className="m-0 p-0">
                  <span>
                    <img
                      src={item.images}
                      alt={item.categoryName}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </span>{" "}
                  {item.categoryName}
                </p>
                <span className="right-arrow">
                  <VscChevronRight />
                </span>
              </Link>
            </li>
          ) : (
            <li key={item._id}>
              <Link to="/list-service" onClick={handleCloseCategories}>
                <span>
                  <img
                    src={item.images}
                    alt={item.categoryName}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "5px",
                    }}
                  />
                </span>{" "}
                {item.categoryName}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Department;
