import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`, // use REACT_APP_API_BASE_URL for backend API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
