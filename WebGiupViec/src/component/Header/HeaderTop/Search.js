import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllServices } from "../../../services/serviceService";
import { formatCurrency } from "../../../utils/formatCurrency";
import { message } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [services, setServices] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // ref for dropdown

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setShowSearchResult(false);
      setShowCloseBtn(false);
      setShowSpinner(false);
      return;
    }

    setShowSpinner(true);
    setShowSearchResult(false);
    setShowCloseBtn(false);

    try {
      const response = await getAllServices(1, 10, value, "");
      setServices(response.services);
      setShowSearchResult(true);
      setShowCloseBtn(true);
    } catch (error) {
      console.error("Error fetching services", error);
    } finally {
      setShowSpinner(false);
    }
  };

  const handleCloseBtnClick = () => {
    setShowSearchResult(false);
    setSearchValue("");
    setShowCloseBtn(false);
  };

  const closeSearchUnder992 = () => {
    if (window.innerWidth < 992) {
      setShowSearchResult(false);
    }
  };

  const handleExperienceClick = (service) => {
    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để đặt dịch vụ.");
      navigate("/login");
    } else {
      navigate("/service", { state: { serviceId: service._id } });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search" ref={dropdownRef}>
      <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchValue}
          placeholder="Nhập từ khóa..."
          onChange={handleChange}
          style={{ width: "80%", padding: "8px", fontSize: "14px" }}
        />
        <button style={{ width: "100px", fontSize: "14px" }} type="submit">
          Tìm kiếm
        </button>
        <button
          type="button"
          className="close-search-area"
          onClick={() => setShowSearchResult(false)}
        >
          ✕
        </button>
        <button
          type="button"
          className={showCloseBtn ? "close-btn" : "d-none"}
          onClick={handleCloseBtnClick}
        >
          ✕
        </button>
        <div className={showSpinner ? "lds-dual-ring" : "d-none"}></div>
      </form>

      {/* Animated dropdown */}
      <AnimatePresence>
        {showSearchResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="search-result-wrapper"
            style={{ marginTop: "10px" }}
          >
            {services.length > 0 ? (
              <div className="search-result" style={{ padding: "10px" }}>
                {services.map((service) => {
                  const defaultImage = service.images[0];
                  const discountPrice =
                    service.discount && service.discount > 0
                      ? service.basePrice -
                        (service.basePrice * service.discount) / 100
                      : service.basePrice;

                  return (
                    <div
                      key={service._id}
                      className="service-item d-flex"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        marginBottom: "10px",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        className="img"
                        style={{
                          width: "60px",
                          height: "60px",
                          overflow: "hidden",
                          borderRadius: "4px",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src={defaultImage}
                          alt={service.serviceName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="info" style={{ flex: "1" }}>
                        <Link
                          to="/hourly"
                          style={{
                            color: "#ff6f3c",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }} // Thêm textDecoration: "none"
                          state={{ service }}
                          onClick={() => {
                            setShowSearchResult(false);
                            setShowCloseBtn(false);
                            setSearchValue("");
                            closeSearchUnder992();
                          }}
                        >
                          <h6
                            style={{
                              fontSize: "16px", // Tăng font-size
                              margin: "0 0 5px",
                              fontWeight: "bold", // In đậm
                            }}
                          >
                            {service.serviceName}
                          </h6>
                        </Link>

                        <p
                          style={{
                            color: "#666",
                            margin: "5px 0",
                            fontSize: "12px",
                          }}
                        >
                          {service.shortDescription}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            margin: "5px 0",
                          }}
                        >
                          Danh mục: {service.categoryId.categoryName}
                        </p>
                        <div
                          className="service-price"
                          style={{ fontSize: "12px" }}
                        >
                          {service.discount ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0",
                                  color: "gray",
                                  textDecoration: "line-through",
                                  marginRight: "5px",
                                }}
                              >
                                {formatCurrency(service.basePrice)}
                              </p>
                              <p
                                style={{
                                  margin: "0",
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {formatCurrency(discountPrice)}
                              </p>
                            </div>
                          ) : (
                            <p style={{ margin: "0", fontWeight: "bold" }}>
                              {formatCurrency(service.basePrice)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleExperienceClick(service)}
                          style={{
                            marginTop: "10px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            backgroundColor: "#ff6f3c",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Đặt lịch
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="my-2">Không tìm thấy dịch vụ nào.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
