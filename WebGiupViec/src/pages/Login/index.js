import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { signIn } from "../../services/authService";
import { loginUser } from "../../redux/actions/userActions"; // import action để lưu user vào Redux
import { useNavigate } from "react-router-dom"; // import useNavigate

const initFormValue = {
  email: "",
  password: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

function Login() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); // khởi tạo useNavigate

  const validateForm = () => {
    const error = {};
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Vui lòng nhập email";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Vui lòng nhập mật khẩu";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const res = await signIn(formValue.email, formValue.password);
        if (!res.success) {
          message.error(res.message); // Thông báo lỗi nếu đăng nhập thất bại
          return;
        }

        const { user, accessToken } = res.payload;
        // Lưu token vào localStorage để giữ trạng thái đăng nhập
        localStorage.setItem("accessToken", accessToken);

        // Lưu thông tin người dùng vào Redux
        dispatch(loginUser(user));

        message.success("Đăng nhập thành công!"); // Thông báo thành công khi đăng nhập
        navigate("/"); // Điều hướng sang trang chủ sau khi đăng nhập thành công
      } catch (error) {
        message.error(
          error.response?.data?.message ||
            "Có lỗi xảy ra phía máy chủ, vui lòng thử lại!"
        ); // Thông báo lỗi từ server
      }
    } else {
      console.log("form invalid");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        className="login-form-container"
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
          Đăng nhập
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
              value={formValue.email}
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
            {formError.email && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "6px" }}>
                {formError.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formValue.password}
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
            {formError.password && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "6px" }}>
                {formError.password}
              </div>
            )}
          </div>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <span
              onClick={() => navigate("/forgot-password")}
              style={{
                fontSize: "14px",
                color: "#1890ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Quên mật khẩu?
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
