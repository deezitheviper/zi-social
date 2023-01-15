import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api/v1/"

})