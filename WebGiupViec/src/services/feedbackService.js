import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("accessToken");

// Cấu hình header với Authorization
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// API để lấy tất cả phản hồi với phân trang và bộ lọc
export const getAllFeedback = async (page = 1, limit = 10, filters = {}) => {
  try {
    const { customerId, userId, serviceId } = filters;
    const params = { page, limit, customerId, userId, serviceId };

    const response = await axios.get(`${API_URL}/feedback`, {
      params,
      ...authHeader(),
    });
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phản hồi:", error);
    throw error;
  }
};

// API để tạo mới phản hồi với hình ảnh
export const createFeedback = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, formData, {
      ...authHeader(),
      headers: {
        ...authHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo phản hồi:", error);
    throw error;
  }
};

// API để lấy danh sách feedback theo serviceId với phân trang
export const getFeedbackByServiceId = async (
  serviceId,
  page = 1,
  limit = 10
) => {
  try {
    const params = { page, limit };
    const response = await axios.get(
      `${API_URL}/feedback/service/${serviceId}`,
      {
        params,
        ...authHeader(),
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy phản hồi theo serviceId:", error);
    throw error;
  }
};
