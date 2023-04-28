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
        console.log(`---deleteUserSubmissions: ${userName}`);
        return axios.post(`/deleteuser`, {userName: userName});
    },
    deleteSpecificUserSubmission(id) {
        return axios.post(`/deletesubmission`, {submissionId: id});
    }
};

export default api;