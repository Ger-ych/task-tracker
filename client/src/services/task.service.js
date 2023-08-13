import axios from 'axios'
import config from './config/config';

export const TaskService = {
    async getMyTasks(access_token) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(config.my_tasks_url, { headers });
        return response.data;
    },
    async getProjectTaskList(access_token, project_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.get(`${config.project_task_list_url}${project_id}`, { headers });
        return response.data;
    },
    async setTaskDone(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.task_done_url}${task_id}`, [], { headers });
        return response.data;
    },
    async deleteTask(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.delete_task_url}${task_id}`, [], { headers });
        return response.data;
    },
}