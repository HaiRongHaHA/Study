import axios from "axios";
export const fetchList = () => {
    return axios.get("/list");
};
export const mockTimer = callback => {
    setTimeout(() => {
        callback();
    }, 2000);
};
