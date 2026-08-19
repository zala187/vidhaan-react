import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// =========================
// REGISTER
// =========================
export const registerUser = async (userData) => {
  try {
    console.log("REGISTER DATA:", userData);

    const response = await axios.post(
      `${API_URL}/register`,
      userData,
      {
        withCredentials: true,
      }
    );

    console.log("REGISTER RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    throw error;
  }
};

// =========================
// LOGIN
// =========================
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    throw error;
  }
};

// =========================
// CURRENT USER
// =========================
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/me`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("GET CURRENT USER ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    throw error;
  }
};

// =========================
// LOGOUT
// =========================
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    throw error;
  }
};