import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SectionHeader from "../../Other/SectionHeader";
import { getAllServices } from "../../../../services/serviceService";
import { Link } from "react-router-dom";

const ConsumerElectronics = ({ categoryId, title }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices(1, 10, "", categoryId);
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  if (loading) {
    return <div>Đang tải dịch vụ...</div>;
  }

  return (
    <div className="consumer-electronics">
      <div className="section-header-wrapper">
        <SectionHeader title={title} />
      </div>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="item">
                <div className="service-card">
                  <Link to={`/service/${service._id}`}>
                    <div className="service-card-image">
                      <img
                        src={service.images[0]}
                        alt={service.serviceName}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="service-card-content">
                      <h5 className="service-name">{service.serviceName}</h5>
                      <p className="service-description">
                        {service.shortDescription.length > 100
                          ? service.shortDescription.substring(0, 100) + "..."
                          : service.shortDescription}
                      </p>
                      <div className="service-price">
                        Giá: {service.basePrice.toLocaleString("vi-VN")} VND
                      </div>
                      <div className="service-location">
                        Địa điểm: {service.address}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>Không có dịch vụ nào</div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default ConsumerElectronics;
