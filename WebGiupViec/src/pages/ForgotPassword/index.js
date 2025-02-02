import React, { useState } from "react";
import { message } from "antd";
import { requestPasswordReset } from "../../services/passwordService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const isEmptyValue = (value) => !value || value.trim().length < 1;

  const validateForm = () => {
    if (isEmptyValue(email)) {
      setFormError("Vui lòng nhập email");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true); // Set loading to true when request starts
      try {
        const res = await requestPasswordReset(email);
        if (res.success) {
          message.success(
            "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!"
          );
          navigate("/login");
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    }
  };

  return (
    <div
      className="forgot-password-page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        className="forgot-password-form-container"
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
          Quên mật khẩu
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={handleChange}
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
              padding: "10px", // Reduced height to 10px
              fontSize: "18px",
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Đang xử lý..." : "Yêu cầu đặt lại mật khẩu"}{" "}
            {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
