import axios from 'axios'
import config from './config/config';

export const ProjectService = {
    async getProjectList(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.get(config.project_list_url, { headers });
        return response.data;
    },
    async deleteProject(access_token, project_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(`${config.project_delete_url}${project_id}`, [], { headers });
        return response.data;
    },
    async createProject(access_token, data) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(`${config.project_create_url}`, data, { headers });
        return response.data;
    },
}