import axios from "axios";

const url = "https://lobster-app-ycavu.ondigitalocean.app/api";

axios.defaults.baseURL = `${url}`;

const api = {
    getLeaderboardData() {
        console.log("getLeaderboardData()");
        return axios.get("/leaderboard");
    },
    getUserData(id) {
        console.log(`getUserData(${id})`);
        return axios.get(`/account`);
    },
    postUserSubmissionData(userData) {
        console.log(`postUserSubmissionData(${userData})`);
        return axios.post("/submit", userData);
    },
    createUser(userData) {
        console.log(`createUser(${userData})`);
        return axios.post("/user/create", userData);
    },
    getUser(email) {
        console.log(`getUser(${email})`);
        return axios.post(`/user`, email);
    },
    deleteUser(email) {
        return axios.delete(`/user/delete`, email);
    }
};

export default api;