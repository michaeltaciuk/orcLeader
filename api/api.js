import axios from "axios";

const url = "https://lobster-app-ycavu.ondigitalocean.app/api";

axios.defaults.baseURL = `${url}`;

const api = {
    getLeaderboardData() {
        return axios.get("/leaderboard");
    },
    getChallengeData() {
        return axios.get("/challange");
    },
    getUserData(id) {
        return axios.get(`/account`);
    },
    postUserSubmissionData(userData) {
        return axios.post("/submit", userData);
    },
    createUser(userData) {
        return axios.post("/user/create", userData);
    },
    getUser(email) {
        return axios.post(`/user`, email);
    },
    deleteUser(email) {
        return axios.delete(`/user/delete`, email);
    }
};

export default api;