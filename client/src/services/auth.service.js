import axios from 'axios'
import config from './config/config';


export const AuthService = {
    // Lofin function
    async login(data) {
        const headers = {
            'content-type': 'multipart/form-data',
        }

        const response = await axios.post(config.login_url, data, { headers });
        return response;
    },
    // Function to get user info
    async getUserInfo(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(config.user_info_url, { headers });
        return response.data;
    }
}