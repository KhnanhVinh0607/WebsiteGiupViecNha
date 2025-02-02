import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiUserCheck } from "react-icons/fi"; // Import the icon for "Trở thành đối tác"

const LangAndMonetaryUnit = () => {
  const navigate = useNavigate();

  // Get user login status from Redux
  const isUserLoggedIn = useSelector((state) => state.user.isAuthenticated);

  const handleClick = () => {
    if (!isUserLoggedIn) {
      navigate("/employee"); // Navigate to the /employee page
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {/* Display "Trở thành đối tác" if the user is logged in */}
        {!isUserLoggedIn && (
          <li onClick={handleClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "#ffffff" }}>
            <FiUserCheck style={{ marginRight: "8px", fontSize: "18px" }} /> {/* Icon for "Trở thành đối tác" */}
            <p style={{ margin: 0 }}>Trở thành đối tác</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LangAndMonetaryUnit;
