import React from 'react'
import { useAuth } from "../../../hooks/useAuth"
import Header from '../../ui/Header';

const Home = () => {
    const { user } = useAuth();

    return (
        <main className='container'>
            <Header />
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Здравствуйте, {user?.username}!</h1>
                    <p className="col-md-8 fs-4">Роль: {user?.role}</p>
                </div>
            </div>
        </main>
    )
}

export default Home