import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './screens/login/Login'

import PageNotFound from "./errors/page_not_found/PageNotFound"
import Home from "./screens/home/Home"
import MyTasks from "./screens/my_tasks/MyTasks"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<MyTasks />} path="/tasks" />

                <Route element={<Login />} path="/login" />

                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router