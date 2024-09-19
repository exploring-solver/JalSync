import axios from 'axios';
import * as authStorage from './authStorage';

// const BASE_URL = 'http://192.168.97.198:5000/api';
const BASE_URL = 'http://192.168.1.2:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const token = await authStorage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth
export const login = (email, password) => {
    return api.post('/users/login', { email, password })
        .then((response) => {
            console.log('Login successful:');
            return response; // Return the response if needed for further processing
        })
        .catch((error) => {
            console.error('Error during login:', error);
            throw error; // Re-throw the error for handling elsewhere
        });
};
export const register = (userData) => {
    return api.post('/users/register', userData)
        .then((response) => {
            console.log('Registration successful:', response);
            return response; // Return the response if needed for further processing
        })
        .catch((error) => {
            console.error('Error during registration:', error);
            throw error; // Re-throw the error for handling elsewhere
        });
};
export const getUserProfile = () => api.get('/users/profile');

// Assets
export const getAssets = () => api.get('/assets');
export const createAsset = (assetData) => api.post('/assets', assetData);
export const updateAsset = (id, assetData) => api.put(`/assets/${id}`, assetData);
export const deleteAsset = (id) => api.delete(`/assets/${id}`);

// Billings
export const getBillings = () => api.get('/billings');
export const createBilling = (billingData) => api.post('/billings', billingData);
export const updateBilling = (id, billingData) => api.put(`/billings/${id}`, billingData);
export const deleteBilling = (id) => api.delete(`/billings/${id}`);

// Consumables
export const getConsumables = () => api.get('/consumables');
export const createConsumable = (consumableData) => api.post('/consumables', consumableData);
export const updateConsumable = (id, consumableData) => api.put(`/consumables/${id}`, consumableData);
export const deleteConsumable = (id) => api.delete(`/consumables/${id}`);

// Panchayats
export const getPanchayats = () => api.get('/panchayats');
export const createPanchayat = (panchayatData) => api.post('/panchayats', panchayatData);
export const updatePanchayat = (id, panchayatData) => api.put(`/panchayats/${id}`, panchayatData);
export const deletePanchayat = (id) => api.delete(`/panchayats/${id}`);

export default api;