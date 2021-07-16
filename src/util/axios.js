import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://internal-classified-backend.herokuapp.com/api",
});

export default axiosInstance;
