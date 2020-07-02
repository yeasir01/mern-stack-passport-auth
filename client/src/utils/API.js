import axios from 'axios';

export default {
    login: (data) => {
        return axios.post("/api/auth", data)
    },
    logout: () => {
        return axios.get('/api/auth/logout')
    },
    register: (data) => {
        return axios.post("/api/auth/register", data)
    },
    authenticate: () => {
        return axios.get('/api/auth', { withCredentials: true })
    }
}