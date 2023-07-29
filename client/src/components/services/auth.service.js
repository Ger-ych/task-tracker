import axios from 'axios'

const domain = 'http://api.tasktracker.loc'

const login_url = '/auth/login/'

export const AuthService = {
    async login(data) {
        const response = await axios.post(domain+login_url, data, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        });

        return response;
    }
}