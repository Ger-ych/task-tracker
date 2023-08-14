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
    task_delete_url: `${domain}/task/delete/`,
    task_view_url: `${domain}/task/view?id=`,
    task_create_url: `${domain}/task/create/`,
    task_update_url: `${domain}/task/update/`,

    // project service
    project_list_url: `${domain}/project/list/`,
    project_view_url: `${domain}/project/view?id=`,
    project_delete_url: `${domain}/project/delete/`,
    project_create_url: `${domain}/project/create/`,
    project_update_url: `${domain}/project/update/`,

    // developer service
    developer_list_url: `${domain}/developer/list/`,
};

export default config;