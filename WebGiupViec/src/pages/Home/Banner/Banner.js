import React from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import Banner3 from "../../../image/banner3.jpg"
import Banner1 from "../../../image/banner1.jpg"


const Banner = () => {
  const BannerRightData = [
    {
      id: 1,
      img: Banner3,
    },
    {
      id: 2,
      img: Banner1,
    },
  ];

  return (
    <section id="home-banner">
      <div className="container">
        <div className="home-banner-content">
          <div className="banner-slider-wrapper banner-left">
            <Slider />
          </div>
          <div className="banner-right-imgs">
            {BannerRightData.map((item) => (
              <div key={item.id} className="banner-img-wrapper">
                <Link to="/list-service">
                  <img
                    src={item.img}
                    alt="banner-img"
                    style={{
                      width: "390px",
                      height: "193px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
