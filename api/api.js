import axios from "axios";

import { API_URL } from '@env';
// const API_URL = "http://localhost:3001";

axios.defaults.baseURL = `${API_URL}/api`;

const api = {
    getLeaderboardData() {
        return axios.get("/leaderboard");
    },
    getChallengeData() {
        return axios.get("/challange");
    },
    postUserSubmissionData(userData) {
        return axios.post("/submit", userData);
    },
    getUserSubmissions(userName) {
        console.log(`getUserSubmissions: ${userName}`);
        return axios.post(`/usersubmissions`, {userName});
    },
    deleteUserSubmissions(userName) {
        return axios.delete(`/deleteuser`, {userName});
    }
};

export default api;