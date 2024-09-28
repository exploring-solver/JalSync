import axios from 'axios';

// Base API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Panchayat API
export const fetchPanchayats = async () => {
    try {
        const response = await api.get('/api/panchayats/');
        return response.data; // Return panchayats data
    } catch (error) {
        console.error('Error fetching panchayats:', error);
        throw error; // Propagate error to the caller
    }
};
// Billing API functions

// Add a new billing record
export const addBilling = async (billingData) => {
    try {
        const response = await api.post('/api/billing', billingData);
        return response.data;
    } catch (error) {
        console.error('Error adding billing record:', error);
        throw error;
    }
};

// Get all billing records
export const getBillings = async () => {
    try {
        const response = await api.get('/api/billing');
        return response.data;
    } catch (error) {
        console.error('Error fetching billing records:', error);
        throw error;
    }
};

// Get a billing record by ID
export const getBillingById = async (id) => {
    try {
        const response = await api.get(`/api/billing/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching billing record:', error);
        throw error;
    }
};

// Update a billing record
export const updateBilling = async (id, billingData) => {
    try {
        const response = await api.put(`/api/billing/${id}`, billingData);
        return response.data;
    } catch (error) {
        console.error('Error updating billing record:', error);
        throw error;
    }
};

// Delete a billing record
export const deleteBilling = async (id) => {
    try {
        const response = await api.delete(`/api/billing/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting billing record:', error);
        throw error;
    }
};

export default api;
