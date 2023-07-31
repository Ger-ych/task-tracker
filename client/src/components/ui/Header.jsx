import React from 'react'
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"

const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();

        logout();
    }

    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <img src="/favicon.png" alt="" className='me-2' width="40" height="40" />

                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link className="nav-link px-2 link-body-emphasis" to="/">Главная</Link></li>

                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Мои задачи</a></li>
                        
                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Проекты</a></li>
                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Разработчики</a></li>
                    </ul>

                    <div className="dropdown text-end">
                        <a href="#" className="d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none dropdown-toggle fs-3" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-regular fa-circle-user"></i>
                            <p className='fs-5 mb-0 ms-1'>{user?.username}</p>
                        </a>
                        <ul className="dropdown-menu text-small text-center">
                            <li><a className="dropdown-item" href='' onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i> Выйти</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header