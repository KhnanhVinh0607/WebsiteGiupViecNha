// Import necessary libraries and base URL
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const getToken = () => localStorage.getItem("accessToken");

// API to get all favorite staff for a specific customer with pagination
export const getFavoriteStaffByCustomer = async (
  customerId,
  page = 1,
  limit = 10
) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${API_URL}/favorite-staff/${customerId}`,
      {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching favorite staff by customer:", error);
    return {
      favoriteStaff: [],
      currentPage: 1,
      totalPages: 1,
      totalFavoriteStaff: 0,
    };
  }
};

// API to add a staff member to customer's favorite list
export const addFavoriteStaff = async (customerId, staffId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/favorite-staff`,
      { customerId, staffId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite staff:", error);
    throw error;
  }
};

// API to remove a staff member from customer's favorite list
export const removeFavoriteStaff = async (customerId, staffId) => {
  try {
    const token = getToken();
    const response = await axios.delete(
      `${API_URL}/favorite-staff/${customerId}/${staffId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite staff:", error);
    throw error;
  }
};
