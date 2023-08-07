import React, { useEffect, useState } from 'react'

import { AuthService } from '../../../services/auth.service';
import { useAuth } from "../../../hooks/useAuth"
import { withAuth } from '../../../HOC/withAuth'
import Header from '../../ui/Header';
import Loading from "../../ui/Loading";


const Home = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function getUserInfo() {
            try {
                const user_info = await AuthService.getUserInfo(user.token);
                setUserInfo(user_info);
            } catch (error) {
                console.error(error.message);
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
                    <p className="col-md-8 fs-4 mb-0">Роль: {user?.role}</p>
                    {userInfo ? (
                      <>
                        <p className="col-md-8 fs-4 mb-0">ID: {userInfo.id}</p>
                        <p className="col-md-8 fs-4 mb-0">Email: {userInfo.email}</p>
                        <p className="col-md-8 fs-4 mb-0">Git: <a href={userInfo.git_profile_link}>{userInfo.git_profile_link}</a></p>
                      </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </main>
    )
}

export default withAuth(Home)