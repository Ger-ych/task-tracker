import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './screens/login/Login'

import PageNotFound from "./errors/page_not_found/PageNotFound"
import Home from "./screens/home/Home"
import MyTasks from "./screens/my_tasks/MyTasks"
import ProjectList from "./screens/project_list/ProjectList"
import DeveloperList from "./screens/developer_list/DeveloperList"
import ProjectTaskList from "./screens/project_task_list/ProjectTaskList"
import ProjectCreate from "./screens/project_create/ProjectCreate"
import ProjectUpdate from "./screens/project_update/ProjectUpdate"
import TaskCreate from "./screens/task_create/TaskCreate"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />

                <Route element={<MyTasks />} path="/my-tasks" />
                <Route element={<TaskCreate />} path="/tasks/create" />

                <Route element={<ProjectList />} path="/projects" />
                <Route element={<ProjectTaskList />} path="/projects/:id/tasks" />
                <Route element={<ProjectCreate />} path="/projects/create" />
                <Route element={<ProjectUpdate />} path="/projects/:id/update" />

                <Route element={<DeveloperList />} path="/developers" />

                <Route element={<Login />} path="/login" />

                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router