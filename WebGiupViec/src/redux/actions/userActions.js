// userActions.js

import { message } from "antd"; // Sử dụng Ant Design để hiển thị thông báo

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";

// Action để đăng nhập người dùng
export const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData,
  };
};
export const updateUser = (updatedProfile) => ({
  type: UPDATE_USER,
  payload: updatedProfile,
});
// Action để đăng xuất người dùng
export const logoutUser = () => {
  message.info("Đã đăng xuất!");
  localStorage.removeItem("accessToken"); // Xóa token khi đăng xuất
  return {
    type: LOGOUT_USER,
  };
};
