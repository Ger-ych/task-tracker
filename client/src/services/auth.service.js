import axios from 'axios'
import config from './config/config';

export const AuthService = {
    async login(data) {
        const response = await axios.post(config.login_url, data, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        });

        return response;
    }
}