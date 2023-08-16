import axios from 'axios'
import config from './config/config';

export const TaskService = {
    // Function to get a list of all user tasks
    async getMyTasks(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(config.my_tasks_url, { headers });
        return response.data;
    },
    // Function to get a list of tasks by project ID
    async getProjectTaskList(access_token, project_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(`${config.project_task_list_url}${project_id}`, { headers });
        return response.data;
    },
    // Function to set task done by ID
    async setTaskDone(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.task_done_url}${task_id}`, [], { headers });
        return response.data;
    },
    // Function to delete an existing task by ID
    async deleteTask(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.task_delete_url}${task_id}`, [], { headers });
        return response.data;
    },
    // Function to get data of one task by ID
    async getTaskData(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(`${config.task_view_url}${task_id}`, { headers });
        return response.data;
    },
    // Function to create a new task
    async createTask(access_token, data) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(config.task_create_url, data, { headers });
        return response;
    },
    // Function to update an existing task by ID
    async updateTask(access_token, task_id, data) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.task_update_url}${task_id}`, data, { headers });
        return response;
    },
}