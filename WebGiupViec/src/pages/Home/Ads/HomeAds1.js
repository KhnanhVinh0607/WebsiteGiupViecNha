import React from "react";
import { Link } from "react-router-dom";

const HomeAds1 = () => {
  const AdsData1 = [
    {
      id: 1,
      img: "https://www.btaskee.com/wp-content/uploads/2023/03/thong-cao-bao-chi-btaskee-hue.jpg",
    },
    {
      id: 2,
      img: "https://cdn-www.vinid.net/13a4ac72-btaskee.jpg",
    },
    {
      id: 3,
      img: "https://www.btaskee.com/wp-content/uploads/2020/11/home-cleaning-banner-ver-25.jpg",
    },
  ];

  return (
    <section id="ads-1">
      <div className="container">
        <div className="row">
          {AdsData1.map((item) => (
            <div key={item.id} className="col-lg-4">
              <div className="ads-img">
                <Link to="/list-service">
                  <img
                    src={item.img}
                    alt="ads-img"
                    style={{
                      width: "416px",
                      height: "224px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAds1;
