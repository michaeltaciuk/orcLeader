import axios from "axios";

const url = "http://localhost:3001/api";

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
    // createUser(userData) {
    //     console.log(`createUser(${userData})`);
    //     return axios.post("/user/new", userData);
    // },
    // updateUser(userData) {
    //     console.log(`updateUser(${userData})`);
    //     return axios.post(`/user/${userData.email}`, userData);
    // },
    // deleteUser(email) {
    //     return axios.delete(`/user/${email}`);
    // }
};

export default api;