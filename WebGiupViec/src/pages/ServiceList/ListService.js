import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../services/serviceService";
import { getAllCategories } from "../../services/categoryService";
import { Pagination, List, Button, Card, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { AddToWishlist } from "../../redux/actions/wishlistActions"; // Import action để thêm vào wishlist

const { Meta } = Card;

function ListService() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy danh sách wishlist từ Redux để kiểm tra xem sản phẩm đã có trong wishlist chưa
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data.categories || []);
    };

    fetchCategories();
    fetchServices();
  }, []);

  const fetchServices = async (categoryId = "", page = 1) => {
    const data = await getAllServices(page, pageSize, "", categoryId);
    setServices(data.services || []);
    setTotalServices(data.totalServices || 0);
    setCurrentPage(data.currentPage || 1);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchServices(categoryId);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    fetchServices(selectedCategory, page);
  };

  const handleAddToWishlist = (service) => {
    // Kiểm tra với `service._id` thay vì `service.id`
    if (!wishlist.find((item) => item._id === service._id)) {
      dispatch(AddToWishlist(service));
      message.success("Đã thêm vào danh sách yêu thích!");
    } else {
      message.info("Dịch vụ đã có trong danh sách yêu thích.");
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <div
        className="main-form"
        style={{ display: "flex", gap: "20px", padding: "0 40px" }}
      >
        {/* SideBar */}
        <div className="sidebar" style={{ width: "20%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Các loại dịch vụ
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{
                padding: "10px 0",
                cursor: "pointer",
                fontWeight: selectedCategory ? "normal" : "bold",
              }}
              onClick={() => handleCategorySelect("")}
            >
              Tất cả dịch vụ
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                style={{
                  padding: "10px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleCategorySelect(category._id)}
              >
                <img
                  src={category.images}
                  alt={category.categoryName}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <span
                  style={{
                    fontWeight:
                      selectedCategory === category._id ? "bold" : "normal",
                  }}
                >
                  {category.categoryName}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Service List */}
        <div className="service-list" style={{ width: "80%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Danh sách dịch vụ
          </h3>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={services}
            renderItem={(service) => {
              // Kiểm tra dựa trên service._id để chỉ đổi màu cho từng mục
              const isInWishlist = wishlist.some(
                (item) => item._id === service._id
              );
              return (
                <List.Item key={service._id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={service.serviceName}
                        src={service.images ? service.images[0] : ""}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#FF6F3C",
                          borderColor: "#FF6F3C",
                        }}
                        onClick={() =>
                          navigate("/hourly", { state: { service } })
                        }
                      >
                        Chi tiết dịch vụ
                      </Button>,
                      <FontAwesomeIcon
                        icon={isInWishlist ? faSolidHeart : faRegularHeart}
                        onClick={() => handleAddToWishlist(service)}
                        style={{
                          cursor: "pointer",
                          color: isInWishlist ? "#FF6F3C" : "gray",
                          fontSize: "24px", // Tăng kích thước lên
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      title={service.serviceName}
                      description={
                        <>
                          <p>{service.shortDescription}</p>
                          <p style={{ color: "#FF6F3C", fontWeight: "bold" }}>
                            Giá dự tính: {formatCurrency(service.basePrice)}
                          </p>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalServices}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ListService;
