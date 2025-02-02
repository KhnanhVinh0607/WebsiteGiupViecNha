import React, { useState } from "react";
import { Input, message, Select } from "antd";
import { signUp } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const initFormValue = {
  name: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const isEmptyValue = (value) => !value || value.trim().length < 1;
const isEmailValid = (email) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

// Hàm kiểm tra tính hợp lệ của mật khẩu
const isPasswordValid = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

function Register() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const error = {};
    const vietnamPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

    if (isEmptyValue(formValue.name)) {
      error["name"] = "Tên là bắt buộc";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email là bắt buộc";
    } else if (!isEmailValid(formValue.email)) {
      error["email"] = "Email không hợp lệ";
    }
    if (isEmptyValue(formValue.address)) {
      error["address"] = "Địa chỉ là bắt buộc";
    }
    if (isEmptyValue(formValue.phone)) {
      error["phone"] = "Số điện thoại là bắt buộc";
    } else if (!vietnamPhoneRegex.test(formValue.phone)) {
      error["phone"] = "Số điện thoại không đúng định dạng";
    }

    if (isEmptyValue(formValue.password)) {
      error["password"] = "Mật khẩu là bắt buộc";
    } else if (!isPasswordValid(formValue.password)) {
      error["password"] = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    if (isEmptyValue(formValue.confirmPassword)) {
      error["confirmPassword"] = "Xác nhận mật khẩu là bắt buộc";
    } else if (formValue.confirmPassword !== formValue.password) {
      error["confirmPassword"] = "Mật khẩu không khớp";
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormValue({ ...formValue, address: value });
    setFormError({ ...formError, address: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const newUser = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
        address: formValue.address,
        role: "customer",
        active: true,
      };

      try {
        const res = await signUp(newUser);
        if (!res.success) {
          message.error(res.message);
          return;
        }
        message.success("Đăng ký thành công!");
        setFormValue(initFormValue);
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    } else {
      message.error("Vui lòng kiểm tra lại các thông tin.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "25px",
      }}
    >
      <div
        style={{
          width: "50%",
          maxWidth: "600px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Đăng Ký Tài Khoản
        </h1>
        <form onSubmit={handleSubmit}>
          {["name", "email", "phone"].map((field) => (
            <div style={{ marginBottom: "15px" }} key={field}>
              <label
                htmlFor={field}
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {field === "name"
                  ? "Họ và Tên"
                  : field === "email"
                  ? "Email"
                  : "Số điện thoại"}
              </label>
              <Input
                id={field}
                name={field}
                placeholder={
                  field === "name"
                    ? "Nhập họ và tên của bạn"
                    : field === "email"
                    ? "Nhập email của bạn"
                    : "Nhập số điện thoại của bạn"
                }
                value={formValue[field]}
                onChange={handleChange}
                style={{ height: "40px", width: "100%" }}
              />
              {formError[field] && (
                <div
                  style={{
                    color: "#ff4d4f",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {formError[field]}
                </div>
              )}
            </div>
          ))}

          {/* Địa chỉ - Select field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="address"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Địa chỉ
            </label>
            <Select
              id="address"
              placeholder="Chọn địa chỉ"
              value={formValue.address}
              onChange={handleSelectChange}
              style={{ width: "100%", height: "40px" }}
              options={[
                { value: "Hà Nội", label: "Hà Nội" },
                { value: "Đà Nẵng", label: "Đà Nẵng" },
                {
                  value: "Thành phố Hồ Chí Minh",
                  label: "Thành phố Hồ Chí Minh",
                },
              ]}
            />
            {formError.address && (
              <div
                style={{
                  color: "#ff4d4f",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                {formError.address}
              </div>
            )}
          </div>

          {["password", "confirmPassword"].map((field) => (
            <div style={{ marginBottom: "15px" }} key={field}>
              <label
                htmlFor={field}
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {field === "password" ? "Mật khẩu" : "Xác nhận mật khẩu"}
              </label>
              <Input.Password
                id={field}
                name={field}
                placeholder={
                  field === "password"
                    ? "Nhập mật khẩu của bạn"
                    : "Nhập lại mật khẩu của bạn"
                }
                value={formValue[field]}
                onChange={handleChange}
                style={{ height: "40px", width: "100%" }}
              />
              {formError[field] && (
                <div
                  style={{
                    color: "#ff4d4f",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {formError[field]}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#40a9ff")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1890ff")}
          >
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
