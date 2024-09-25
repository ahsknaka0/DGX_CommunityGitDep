// src/api/api.js

const BASE_URL = import.meta.env.VITE_API_BASEURL

const apiRequest = async (endpoint, method = 'GET', body = {}, headers = { 'Content-Type': 'application/json' }) => {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
        method,
        headers,
        body: Object.keys(body).length ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // const errorDetails = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in API request:', error.message, error.stack);
        throw error;
    }
};

export default apiRequest;
