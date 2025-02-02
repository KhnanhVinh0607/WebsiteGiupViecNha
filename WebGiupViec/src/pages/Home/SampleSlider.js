import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllServices } from "../../services/serviceService";
import { formatCurrency } from "../../utils/formatCurrency";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF6F3C",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "50px",
        marginRight: "70px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF6F3C",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "50px",
        marginLeft: "70px",
      }}
      onClick={onClick}
    />
  );
}

function SampleSlider() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAllServices(1, 10);
      setServices(response.services || []);
    };

    fetchServices();
  }, []);

  const handleBookingClick = (service) => {
    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để đặt dịch vụ.");
      navigate("/login");
    } else {
      navigate("/service", { state: { serviceId: service._id } });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Slider {...settings}>
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              padding: "0 15px", // Add horizontal padding between cards
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                padding: "15px",
                position: "relative",
                textAlign: "left",
              }}
            >
              <img
                src={service.images[0]}
                alt={service.serviceName}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => handleBookingClick(service)}
              />
              <div style={{ padding: "10px 0" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    cursor: "pointer",
                  }}
                  onClick={() => handleBookingClick(service)}
                >
                  {service.serviceName}
                </h3>
                <p style={{ color: "#888", fontSize: "14px", margin: "5px 0" }}>
                  {service.shortDescription.slice(0, 60) + "..."}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      marginRight: "10px",
                    }}
                  >
                    <strong>Giá dự tính:</strong>{" "}
                    {formatCurrency(service.basePrice)}
                  </span>
                </div>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#ff6f3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => handleBookingClick(service)}
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SampleSlider;
