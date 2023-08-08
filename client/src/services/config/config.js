export const admin_domain = 'http://admin.tasktracker.loc'
export const domain = 'http://api.tasktracker.loc'

const config = {    
    // auth service
    login_url: `${domain}/auth/login/`,
    user_info_url: `${domain}/auth/info/`,

    // task service
    my_tasks_url: `${domain}/task/list/`,
    task_done_url: `${domain}/task/done/`
};

export default config;