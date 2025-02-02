import React from "react";
import { Link } from "react-router-dom";

const HomeAds2 = () => {
  return (
    <section id="ads-2" style={{ marginTop: "15px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* ======= Bed img ======= */}
            <div className="bed-img">
              <Link to="/list-service">
                <img
                  src="https://www.btaskee.com/wp-content/uploads/2019/03/Banner-giup-viec-nha-home-cleaning-bTaskeer-web-vie.jpg"
                  alt="bed"
                  style={{
                    width: "856px",
                    height: "193px",
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            {/* ======= Iphone img ======= */}
            <div className="iphone-img">
              <Link to="/list-service">
                <img
                  src="https://cdn-www.vinid.net/38a5e7dd-btaskee-voucher-banner.png"
                  alt="iphonex"
                  style={{
                    width: "416px",
                    height: "193px",
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAds2;
