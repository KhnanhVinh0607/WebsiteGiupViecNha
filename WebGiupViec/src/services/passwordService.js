import { message } from "antd";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/password`;

// Function to request a password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Yêu cầu đặt lại mật khẩu thất bại:", error);
    message.error(
      error?.response?.data?.message || "Yêu cầu đặt lại mật khẩu thất bại"
    );
    return { success: false, message: "Yêu cầu đặt lại mật khẩu thất bại" };
  }
};

// Function to reset the password using token
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Đặt lại mật khẩu thất bại:", error);
    message.error(
      error?.response?.data?.message || "Đặt lại mật khẩu thất bại"
    );
    return { success: false, message: "Đặt lại mật khẩu thất bại" };
  }
};
