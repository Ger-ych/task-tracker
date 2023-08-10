import React from 'react'
import { useQuery } from '@tanstack/react-query';

import { ProjectService } from '../../../services/project.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager'

import Header from '../../ui/Header';
import Loading from "../../ui/Loading";
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const { user } = useAuth();
    const {data, isLoading} = useQuery(['projects'], () => ProjectService.getProjectList(user.token))

    return (
        <main className='container'>
            <Header />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Проекты</li>
                </ol>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                {
                    data ? data.map(project => (
                        <div key={project.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-2">{project.name}</h3>
                                <div className="mb-1 text-body-secondary">Репозиторий: <a href={project.repo_link}>{project.repo_link}</a></div>

                                <div className="mt-3 accordion accordion-flush" id={`accordionProject${project.id}`}>
                                    <div className="accordion-item border">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${project.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${project.id}`}>
                                            Описание
                                        </button>
                                        </h2>
                                        <div id={`flush-collapseOne${project.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordionProject${project.id}`}>
                                            <div className="accordion-body">
                                                <p>{project.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <h3 className="">Нет проектов</h3>
                }
                </>
            )}
        </main>
    )
}

export default onlyAdminOrManager(ProjectList)