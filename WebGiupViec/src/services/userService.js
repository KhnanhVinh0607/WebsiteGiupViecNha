import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("accessToken");

// Cấu hình header với Authorization
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getUserByid = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const changePassword = async (userId, passwords) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${API_URL}/user/${userId}/changepassword`, // Thêm userId vào URL
      {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};
export const getAllStaffByServiceId = async (
  serviceId,
  bookingTime,
  userId,
  address
) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/staff/service/${serviceId}?bookingTime=${bookingTime}&userId=${userId}&address=${encodeURIComponent(
        address
      )}`,
      authHeader()
    );
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách staff theo serviceId:", error);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  const token = getToken();
  try {
    const response = await axios.put(
      `${API_URL}/user/profile/${userId}`, // URL cho API cập nhật profile
      profileData, // Dữ liệu hồ sơ mới
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};
