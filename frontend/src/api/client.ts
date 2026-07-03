import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
//Debugger
// console.log("API URL:", apiUrl);
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    //debugger;
    // console.log("Request config:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // Request made and server responded
      console.error("Response error:", error.response);
    }
    return Promise.reject(error);
  },
);

export { apiClient };
