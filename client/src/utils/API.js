import axios from 'axios';

export default {
    login: (data) => {
        return axios.post("/api/auth/login", data)
    },
    logout: () => {
        return axios.get('/api/auth/logout')
    },
    register: (data) => {
        return axios.post("/api/auth/register", data)
    },
    checkAuthState: () => {
        return axios.get('/api/auth')
    }
}