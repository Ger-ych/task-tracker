import React, { useEffect } from 'react'

import { AuthService } from '../../../services/auth.service';
import { useAuth } from "../../../hooks/useAuth"
import { withAuth } from '../../../HOC/withAuth'
import Header from '../../ui/Header';

const Home = () => {
    const { user } = useAuth();

    useEffect(() => {
        async function getUserInfo() {
            try {
                const user_info = await AuthService.info(user.token);
                console.log(user_info);
            } catch (error) {
                console.error(error);
            }
        }

        getUserInfo();
    }, [user.token]);

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

export default withAuth(Home)