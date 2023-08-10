import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './screens/login/Login'

import PageNotFound from "./errors/page_not_found/PageNotFound"
import Home from "./screens/home/Home"
import MyTasks from "./screens/my_tasks/MyTasks"
import ProjectList from "./screens/project_list/ProjectList"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<MyTasks />} path="/my-tasks" />
                <Route element={<ProjectList />} path="/projects" />

                <Route element={<Login />} path="/login" />

                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router