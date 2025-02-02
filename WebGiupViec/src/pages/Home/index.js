import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Banner from "./Banner/Banner";
import Advantages from "./Advantages/Advantages";
import HomeAds1 from "./Ads/HomeAds1";
import Categories from "./Categories/Categories";
import HomeAds2 from "./Ads/HomeAds2";
import { useNavigate } from "react-router-dom";
import SampleSlider from "./SampleSlider";
import Procedure from "./Procedure";
import "./index.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-content">
      <div className="main">
        <Banner />
        <Advantages />
        <HomeAds1 />
        <Categories />
        <div className="container">
          <div className="top-categories-list">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h4>Các tiện ích nổi bật</h4>
                </div>
              </div>
            </div>
          </div>
          <SampleSlider />
        </div>

        <HomeAds2 />
        <Procedure />
        {/* startUse */}
        <div className="startList">
          <div className="startDes">
            <h3 className="startName">Trải nghiệm ngay hôm nay</h3>
            <h3 className="startDescription">
              Bạn đã sẵn sàng sử dụng dịch vụ của We shine chưa? Bắt đầu ngay
              với việc đặt lịch đầu tiên của bạn
            </h3>
          </div>
          <a href="/service" className="startButton">
            Trải nghiệm dịch vụ
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "50px",
    right: "90px",
    zIndex: 1000,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    color: "#ffffff",
    backgroundColor: "#d91f28",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Home;
