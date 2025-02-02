import { message } from "antd";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

// Existing signIn function
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    return { success: false, message: "Đăng nhập thất bại" };
  }
};

// Existing signUp function
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.error("Đăng ký thất bại:", error);
  }
};

export const registerStaff = async (formData) => {
  try {
    // Gọi API với FormData đã được truyền từ component
    const response = await axios.post(`${API_URL}/register-staff`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Đăng ký đối tác thất bại:", error);
    return { success: false, message: "Đăng ký đối tác thất bại" };
  }
};
