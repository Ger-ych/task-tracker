import axios from 'axios'
import config from './config/config';

export const ProjectService = {
    // Function to get a list of all projects
    async getProjectList(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.get(config.project_list_url, { headers });
        return response.data;
    },
    // Function to get data of one project by ID
    async getProjectData(access_token, project_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.get(`${config.project_view_url}${project_id}`, { headers });
        return response.data;
    },
    // Function to delete an existing project by ID
    async deleteProject(access_token, project_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(`${config.project_delete_url}${project_id}`, [], { headers });
        return response.data;
    },
    // Function to create a new project
    async createProject(access_token, data) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(config.project_create_url, data, { headers });
        return response;
    },
    // Function to update an existing project by ID
    async updateProject(access_token, project_id, data) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(`${config.project_update_url}${project_id}`, data, { headers });
        return response;
    },
}