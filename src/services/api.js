// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this URL to match your backend server

// Fetch menu items
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menu`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Add an item to the cart
export const addItemToCart = async (item) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Fetch cart items
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};
