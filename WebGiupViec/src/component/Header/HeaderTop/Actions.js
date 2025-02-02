import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import {
  HiOutlineMenu,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineStar,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";
import { motion, AnimatePresence } from "framer-motion";

const Actions = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex" }}>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li
            style={{
              fontSize: "24px",
              marginLeft: "15px",
            }}
          >
            <Link
              to="/wishlist"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <BsHeart />
              {wishlist.wishlist.length > 0 && (
                <sup style={{ fontSize: "14px" }}>
                  {wishlist.wishlist.length}
                </sup>
              )}
            </Link>
          </li>
          {user && (
            <li style={{ position: "relative", fontSize: "24px" }}>
              <button
                type="button"
                onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: "15px",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <HiOutlineMenu />
              </button>
              <AnimatePresence>
                {showMenuDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: 0,
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                      borderRadius: "6px",
                      zIndex: 10,
                      padding: "10px",
                      minWidth: "180px",
                      listStyleType: "none",
                      margin: 0,
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <HiOutlineUser style={{ marginRight: "8px" }} />
                      <a
                        href="/profile"
                        style={{ textDecoration: "none", color: "#333" }}
                        onClick={() => setShowMenuDropdown(false)}
                      >
                        Thông tin cá nhân
                      </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <HiOutlineClock style={{ marginRight: "8px" }} />
                      <a
                        href="/booking-history"
                        style={{ textDecoration: "none", color: "#333" }}
                        onClick={() => setShowMenuDropdown(false)}
                      >
                        Lịch sử đặt lịch
                      </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <HiOutlineHeart style={{ marginRight: "8px" }} />
                      <a
                        href="/wishlist"
                        style={{ textDecoration: "none", color: "#333" }}
                        onClick={() => setShowMenuDropdown(false)}
                      >
                        Dịch vụ yêu thích
                      </a>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <HiOutlineStar style={{ marginRight: "8px" }} />
                      <a
                        href="/favorite-staff"
                        style={{ textDecoration: "none", color: "#333" }}
                        onClick={() => setShowMenuDropdown(false)}
                      >
                        Nhân viên yêu thích
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
      >
        <div>
          {user && user.avatar ? (
            <Link to="/profile">
              <img
                src={
                  user.avatar ||
                  "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                }
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            </Link>
          ) : (
            <Link to="/profile">
              <img
                src="https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                alt="User Icon"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            </Link>
          )}
        </div>
        <div>
          {user && user.name ? (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link
                to="/login"
                style={{
                  fontWeight: "bold",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  marginLeft: "10px",
                  fontSize: "16px",
                }}
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;
