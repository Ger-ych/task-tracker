import axios from 'axios'
import config from './config/config';

export const DeveloperService = {
    async getDeveloperList(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.get(config.developer_list_url, { headers });
        return response.data;
    }
}