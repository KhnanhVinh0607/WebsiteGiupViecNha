import React, { useState } from "react";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Banner4 from "../../../image/banner4.jpg"
import Banner2 from "../../../image/banner2.jpg"

const Slider = () => {
  const SliderData = [
    {
      id: 1,
      img: Banner4,
    },
    {
      id: 2,
      img: "https://cdn-www.vinid.net/13a4ac72-btaskee.jpg",
    },
    {
      id: 3,
      img: "https://www.btaskee.com/wp-content/uploads/2020/12/home-banner-trang-chu-ver-3-vie.jpg",
    },
  ];

  const [tabIndex, setTabIndex] = useState(1);

  const handleRightBtnClick = () => {
    setTabIndex(tabIndex + 1);
    if (tabIndex >= 3) setTabIndex(1);
  };

  const handleLeftBtnClick = () => {
    setTabIndex(tabIndex - 1);
    if (tabIndex <= 1) setTabIndex(3);
  };

  return (
    <div className="banner-slider">
      {/* ======= Slide item ======= */}
      {SliderData.map((item) => (
        <div
          key={item.id}
          className={item.id === tabIndex ? "slide-item" : "d-none"}
        >
          <Link to="/list-service">
            <img
              src={item.img}
              alt="slide-img"
              style={{
                width: "876px",
                height: "415px",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
      ))}
      {/* ======= Slider buttons ======= */}
      <div className="slider-btns">
        <button onClick={handleLeftBtnClick} className="left-btn">
          <VscChevronLeft />
        </button>
        <button onClick={handleRightBtnClick} className="right-btn">
          <VscChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
