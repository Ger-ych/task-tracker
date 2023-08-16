import { BrowserRouter, Routes, Route } from "react-router-dom"

import PageNotFound from "./errors/page_not_found/PageNotFound"

import Home from "./screens/home/Home"
import Login from './screens/login/Login'

import MyTasks from "./screens/my_tasks/MyTasks"
import ProjectTaskList from "./screens/project_task_list/ProjectTaskList"
import TaskCreate from "./screens/task_create/TaskCreate"
import TaskUpdate from "./screens/task_update/TaskUpdate"

import ProjectList from "./screens/project_list/ProjectList"
import ProjectCreate from "./screens/project_create/ProjectCreate"
import ProjectUpdate from "./screens/project_update/ProjectUpdate"

import DeveloperList from "./screens/developer_list/DeveloperList"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Task pages */}
                <Route element={<MyTasks />} path="/my-tasks" />
                <Route element={<TaskCreate />} path="/tasks/create" />
                <Route element={<TaskUpdate />} path="/tasks/:id/update" />

                {/* Project pages */}
                <Route element={<ProjectList />} path="/projects" />
                <Route element={<ProjectTaskList />} path="/projects/:id/tasks" />
                <Route element={<ProjectCreate />} path="/projects/create" />
                <Route element={<ProjectUpdate />} path="/projects/:id/update" />

                {/* Developer pages */}
                <Route element={<DeveloperList />} path="/developers" />

                {/* Other pages */}
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />

                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router