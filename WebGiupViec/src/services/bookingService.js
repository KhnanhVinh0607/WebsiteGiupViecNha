
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const getToken = () => localStorage.getItem("accessToken");

// API lấy tất cả các booking 
export const getAllBookings = async (page, limit, search = "") => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/booking`, {
      params: { page, limit, search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return {
      bookings: [],
      currentPage: 1,
      totalPages: 1,
      totalBookings: 0,
    };
  }
};

// API tạo booking
export const createBooking = async (bookingData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/booking`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// API thay đổi trạng thái booking
export const changeStatusBooking = async (bookingId, status) => {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${API_URL}/booking/${bookingId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing booking status:", error);
    throw error;
  }
};

// API lấy booking theo ID
export const getBookingById = async (bookingId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};

// API gửi email xác nhận cho khách hàng
export const sendCustomerEmail = async (bookingId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/booking/${bookingId}/send-customer-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending customer email:", error);
    throw error;
  }
};

// API gửi email cho nhân viên được book
export const sendStaffEmail = async (bookingId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/booking/${bookingId}/send-staff-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending staff email:", error);
    throw error;
  }
};
// API hủy booking nếu trạng thái là pending
export const cancelBooking = async (bookingId) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${API_URL}/booking/${bookingId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

// API lấy lịch sử đặt lịch của người dùng theo userId
export const getBookingByUserId = async (userId, page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/booking/user/${userId}`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching booking history by user ID:", error);
    return {
      bookings: [],
      currentPage: 1,
      totalPages: 1,
      totalBookings: 0,
    };
  }
};
