import axios from "axios";

const API = axios.create({
  baseURL: "http://3.111.33.32:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;