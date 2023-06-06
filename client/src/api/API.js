import axios from "axios";
import setIsAuth from "../App";
const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const origReq = error.config;
    if (error.response.status === 401 && !origReq.isRetry) {
      try {
        origReq.isRetry = true;
        const response = await axios.get("http://localhost:5000/refresh", {
          withCredentials: true,
        });
        setIsAuth(true);
        return api.request(origReq);
      } catch (e) {
        console.log("Not auth инт");
      }
    }
    throw error;
  }
);

export default api;
