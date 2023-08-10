import React from 'react'
import { admin_domain } from '../../services/config/config'
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"

const Header = () => {
    const { user, isAdmin, isManager, isDeveloper, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();

        logout();
    }

    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none" to="/">
                        <img src="/favicon.png" alt="" className='me-2' width="40" height="40" />
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link className="nav-link px-2 link-body-emphasis" to="/">Главная</Link></li>
                        
                        {isAdmin() && (
                            <>
                            <li><a href={admin_domain} target='_blank' className="nav-link px-2 link-body-emphasis">Администрирование</a></li>
                            </>
                        )}

                        {(isAdmin() || isManager()) && (
                            <>
                            <li><Link className="nav-link px-2 link-body-emphasis" to="/projects">Проекты</Link></li>
                            </>
                        )}

                        {isDeveloper() && (
                            <>
                            <li><Link className="nav-link px-2 link-body-emphasis" to="/my-tasks">Мои задачи</Link></li>
                            </>
                        )}
                    </ul>

                    <div className="dropdown text-end">
                        <a href="#" className="d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none dropdown-toggle fs-3" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-regular fa-circle-user"></i>
                            <p className='fs-5 mb-0 ms-1'>{user?.username}</p>
                        </a>
                        <ul className="dropdown-menu text-small text-center">
                            <li><a className="dropdown-item" href='' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Выйти</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header