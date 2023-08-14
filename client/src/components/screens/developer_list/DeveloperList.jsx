import React from 'react'
import { useQuery } from '@tanstack/react-query';

import { DeveloperService } from '../../../services/developer.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager'

import { Link } from 'react-router-dom';
import Header from '../../ui/Header';
import Loading from "../../ui/Loading";

const DeveloperList = () => {
    const { user } = useAuth();
    const {data, isLoading} = useQuery(['developers'], () => DeveloperService.getDeveloperList(user.token))

    return (
        <main className='container'>
            <Header />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Разработчики</li>
                </ol>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                {
                    data.length ? data.map(developer => (
                        <div key={developer.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-2">{developer.username}</h3>
                                <div className="mb-1 text-body-secondary">Email: {developer.email}</div>
                                <div className="mb-1 text-body-secondary">Профиль GitHub: <a href={developer.git_profile_link}>{developer.git_profile_link}</a></div>
                            </div>
                        </div>
                    ))
                    : <h3 className="">Нет разработчиков</h3>
                }
                </>
            )}
        </main>
    )
}

export default onlyAdminOrManager(DeveloperList)