import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appstore from "../../image/appstore.png";
import googlePlay from "../../image/google_play.png";
import "./index.css";
import { getAllCategories } from "../../services/categoryService";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(1, 1000);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer id="footer">
      <div className="footerContent">
        <div className="footerLogo">
          <h3 className="footerLogoName">We Shine</h3>
          <div className="footerLogoApp">
            <img src={appstore} alt="Download on App Store" />
            <img src={googlePlay} alt="Get it on Google Play" />
          </div>
          <ul className="footerLogoList">
            <li className="footerLogoItem">
              <div className="footerLogoItemBlock">
                <ul className="footerLogoItemContact">
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faGlobe} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">
                      Việt Nam
                    </h4>
                  </li>
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faEnvelope} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">Liên hệ</h4>
                  </li>
                </ul>
              </div>
            </li>

            <li className="footerLogoItem">
              <div className="footerLogoItemBlock">
                <ul className="footerLogoItemContact">
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      className="icon-item"
                    />
                    <h4 className="footerLogoItemContactDetailText">Hỗ trợ</h4>
                  </li>
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faComment} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">
                      Khiếu nại
                    </h4>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="footerContainer">
          <h3 className="footerContainerName">Công ty</h3>
          <ul className="footerAboutlist">
            <li className="footerAboutItem">Giới thiệu</li>
            <li className="footerAboutItem">Tuyển dụng</li>
            <li className="footerAboutItem">Chi nhánh</li>
            <li className="footerAboutItem">Điều khoản sử dụng</li>
            <li className="footerAboutItem">Chính sách bảo mật</li>
          </ul>
        </div>

        <div className="footerContainer">
          <h3 className="footerContainerName">Các loại dịch vụ</h3>
          <ul className="footerAboutlist">
            {loading ? (
              <li className="footerAboutItem">Đang tải...</li>
            ) : (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="footerAboutItem"
                  onClick={() =>
                    navigate(`/list-service?categoryId=${category._id}`)
                  }
                >
                  {category.categoryName}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="socialsCopyright">
        <p className="copyright">WE SHINE TOGETHER.</p>
        <p className="copyright">FOLLOW US</p>
        <div className="socials-list">
          <FontAwesomeIcon icon={faFacebookF} className="icon-item" />
          <FontAwesomeIcon icon={faInstagram} className="icon-item" />
          <FontAwesomeIcon icon={faTiktok} className="icon-item" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
