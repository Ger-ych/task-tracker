import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './screens/login/Login'

import PageNotFound from "./errors/page_not_found/PageNotFound"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/login" />

                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router