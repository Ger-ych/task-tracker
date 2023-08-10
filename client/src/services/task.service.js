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
    async setTaskDone(access_token, task_id) {
        const headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        
        const response = await axios.post(`${config.task_done_url}${task_id}`, [], { headers });
        return response.data;
    },
}