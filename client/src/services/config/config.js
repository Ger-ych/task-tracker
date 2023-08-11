export const admin_domain = 'http://admin.tasktracker.loc'
export const domain = 'http://api.tasktracker.loc'

const config = {    
    // auth service
    login_url: `${domain}/auth/login/`,
    user_info_url: `${domain}/auth/info/`,

    // task service
    my_tasks_url: `${domain}/task/list/`,
    project_task_list_url: `${domain}/task/list-by-project?id=`,
    task_done_url: `${domain}/task/done/`,

    // project service
    project_list_url: `${domain}/project/list/`,

    // developer service
    developer_list_url: `${domain}/developer/list/`,
};

export default config;