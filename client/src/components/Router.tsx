import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from './screens/home/Home'
// import Login from './screens/login/Login'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/book/:id" /> */}

                <Route element={<div><h3 className="text-center">Not Found!</h3></div>} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router