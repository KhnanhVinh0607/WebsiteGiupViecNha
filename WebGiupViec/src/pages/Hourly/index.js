import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Pagination } from "antd";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faHandPointUp,
  faClock,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import { formatCurrency } from "../../utils/formatCurrency";
import { getFeedbackByServiceId } from "../../services/feedbackService";

function Hourly() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const feedbackLimit = 5;

  useEffect(() => {
    if (service?._id) {
      fetchFeedbacks(service._id, currentPage, feedbackLimit);
    }
  }, [service, currentPage]);

  const fetchFeedbacks = async (serviceId, page, limit) => {
    try {
      const { feedbacks, totalFeedbacks } = await getFeedbackByServiceId(
        serviceId,
        page,
        limit
      );
      setFeedbacks(feedbacks);
      setTotalFeedbacks(totalFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!service) {
    return <p>Không có thông tin dịch vụ.</p>;
  }

  const handleExperienceClick = (service) => {
    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để đặt dịch vụ.");
      navigate("/login");
    } else {
      navigate("/service", { state: { serviceId: service._id } });
    }
  };

  const formatPhoneNumber = (phone) => {
    return phone.slice(0, 3) + "*****" + phone.slice(-2);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Giới thiệu dịch vụ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FF6F3C",
              marginBottom: "10px",
            }}
          >
            Dịch vụ
          </h2>
          <h3
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            {service.serviceName}
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            {service.shortDescription}
          </p>
          <button
            onClick={() => handleExperienceClick(service)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF6F3C",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Trải nghiệm dịch vụ
          </button>
        </div>
        <img
          src={service.images[0]}
          alt={service.serviceName}
          style={{
            width: "400px",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Chi tiết đầy đủ của dịch vụ */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}
        >
          Mô tả dịch vụ
        </h3>
        <div
          style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: service.fullDescription }}
        />
        <p style={{ fontSize: "16px", color: "#333", marginTop: "15px" }}>
          Giá bắt đầu từ:{" "}
          <strong style={{ color: "#FF6F3C" }}>
            {formatCurrency(service.basePrice)}
          </strong>
        </p>
        <p style={{ fontSize: "16px", color: "#333", marginTop: "5px" }}>
          Địa chỉ: <strong>{service.address}</strong>
        </p>
      </div>

      {/* Lý do chọn dịch vụ */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h3
          style={{
            fontSize: "24px",
            color: "#FF6F3C",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          
        </h3>
        <img
          src={service.images[1] || service.images[0]}
          alt="Lý do đặt dịch vụ"
          style={{
            width: "100%",
            maxWidth: "800px",
            marginBottom: "30px",
            borderRadius: "10px",
          }}
        />
        {/* Các lý do chọn dịch vụ */}
      </div>

      {/* Phần hiển thị các Feedback */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            color: "#FF6F3C",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Đánh giá của khách hàng
        </h3>
        {feedbacks.length === 0 ? (
          <p style={{ color: "#555", fontSize: "16px" }}>
            Hiện tại chưa có đánh giá nào cho dịch vụ này.
          </p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={
                      feedback.customerId.avatar ||
                      "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                    }
                    alt={feedback.customerId.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {feedback.customerId.name} -{" "}
                      {formatPhoneNumber(feedback.customerId.phone)}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < feedback.rating ? "#FFD700" : "#e0e0e0", // Màu vàng cho sao được chọn, xám cho sao không chọn
                            fontSize: "16px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "500",
                  }}
                >
                  {new Date(feedback.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "16px", color: "#333" }}>
                  {feedback.comment}
                </div>
                <div style={{ marginTop: "10px" }}>
                  {feedback.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Feedback image ${imgIndex + 1}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Phân trang Feedback */}
        <Pagination
          current={currentPage}
          pageSize={feedbackLimit}
          total={totalFeedbacks}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </div>

      {/* Các công việc của dịch vụ */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#FF6F3C",
            marginBottom: "15px",
          }}
        >
          Cộng tác viên {service?.serviceName} sẽ làm những gì?
        </h3>
        <Task tasks={service.tasks} />
      </div>
    </div>
  );
}

export default Hourly;
