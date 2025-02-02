import React, { useState } from "react";
import { message } from "antd";
import { resetPassword } from "../../services/passwordService"; // Import reset password service
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();

  const validateForm = () => {
    if (!newPassword || !confirmPassword) {
      setFormError("Vui lòng nhập đầy đủ mật khẩu");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setFormError("Mật khẩu xác nhận không khớp");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleChangePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading state
      try {
        const res = await resetPassword(token, newPassword);
        if (res.success) {
          message.success("Mật khẩu đã được đặt lại thành công!");
          navigate("/login"); // Redirect to login page after success
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  return (
    <div
      className="reset-password-page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        className="reset-password-form-container"
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#333",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Đặt lại mật khẩu
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="newPassword"
              style={{
                display: "block",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Mật khẩu mới
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={handleChangePassword}
              style={{
                width: "100%",
                height: "40px",
                padding: "15px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              style={{
                width: "100%",
                height: "40px",
                padding: "15px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            {formError && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "6px" }}>
                {formError}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px", // Reduced padding for the button
              fontSize: "18px",
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
