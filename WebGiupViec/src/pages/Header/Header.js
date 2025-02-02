import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService.js";
import {
  faUser,
  faPenToSquare,
  faBell,
  faHandshake,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from "../../redux/actions/userActions";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories(1, 20);
      setCategories(categories.categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
  };

  return (
    <header
      style={{
        backgroundColor: "#ff6f3c",
        padding: "10px 0",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side */}
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a
                href="/"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                We Shine
              </a>
            </li>

            <li style={{ position: "relative" }} ref={dropdownRef}>
              <FontAwesomeIcon
                icon={faList}
                style={{ marginRight: "8px", color: "#fff", cursor: "pointer" }}
                onClick={toggleDropdown}
              />
              <span
                onClick={toggleDropdown}
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Các loại dịch vụ
              </span>

              {isDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    zIndex: 10,
                    width: "250px",
                  }}
                >
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {categories.map((category) => (
                      <li
                        key={category._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                          padding: "8px",
                          borderRadius: "5px",
                          transition: "background 0.3s",
                          cursor: "pointer",
                          color: "#333",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f1f1f1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <img
                          src={category.images}
                          alt={category.categoryName}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "4px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <a
                          href={`/list-service`}
                          style={{
                            fontSize: "16px",
                            color: "#333",
                            fontWeight: "bold",
                            textDecoration: "none",
                            flex: 1,
                          }}
                        >
                          {category.categoryName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <a
                href="/list-service"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Danh sách dịch vụ
              </a>
            </li>
          </ul>

          {/* Right side */}
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              margin: 0,
              padding: 0,
            }}
          >
            {/* Wishlist text with count */}
            <li
              style={{
                position: "relative",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={navigateToWishlist}
            >
              Dịch vụ yêu thích
              {wishlistCount > 0 && (
                <span
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "#ff6f3c",
                    color: "#ffffff",
                    borderRadius: "50%",
                    padding: "3px 8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </li>

            {user ? (
              <>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                  ref={userDropdownRef}
                >
                  <img
                    src={
                      user.avatar ||
                      "https://i.pinimg.com/originals/44/de/bd/44debd48ce372377233888f8b8d95351.gif"
                    }
                    alt="avatar"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={toggleUserDropdown}
                  />
                  <span
                    onClick={toggleUserDropdown}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {user.name}
                  </span>

                  {isUserDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                        zIndex: 10,
                        width: "200px",
                      }}
                    >
                      <ul
                        style={{ listStyleType: "none", padding: 0, margin: 0 }}
                      >
                        <li style={{ padding: "8px", cursor: "pointer" }}>
                          <a
                            href="/profile"
                            style={{ textDecoration: "none", color: "#333" }}
                          >
                            Thông tin cá nhân
                          </a>
                        </li>
                        <li style={{ padding: "8px", cursor: "pointer" }}>
                          <a
                            href="/booking-history"
                            style={{ textDecoration: "none", color: "#333" }}
                          >
                            Lịch sử đặt lịch
                          </a>
                        </li>
                        <li style={{ padding: "8px", cursor: "pointer" }}>
                          <a
                            href="/wishlist"
                            style={{ textDecoration: "none", color: "#333" }}
                          >
                            Dịch vụ yêu thích
                          </a>
                        </li>
                        <li style={{ padding: "8px", cursor: "pointer" }}>
                          <a
                            href="/favorite-staff"
                            style={{ textDecoration: "none", color: "#333" }}
                          >
                            Nhân viên yêu thích
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>

                {/* Nút Đăng xuất */}
                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "transparent",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                    }}
                  >
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <FontAwesomeIcon
                    icon={faHandshake}
                    style={{ color: "#fff", marginRight: "8px" }}
                  />
                  <a
                    href="/employee"
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Trở thành đối tác
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#ffffff", marginRight: "8px" }}
                  />
                  <a
                    href="/register"
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                      paddingRight: "8px",
                      borderRight: "1px solid #fff",
                    }}
                  >
                    Đăng ký
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "#fff", marginRight: "8px" }}
                  />
                  <a
                    href="/login"
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Đăng nhập
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
