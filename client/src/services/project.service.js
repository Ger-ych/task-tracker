import axios from 'axios'
import config from './config/config';

export const AuthService = {
    async getProjectList(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.get(config.project_list_url, { headers });
        return response.data;
    }
}