import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import { ProjectService } from '../../../services/project.service';
import { useAuth } from "../../../hooks/useAuth"
import { useDeleteProject } from './useDeleteProject';
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager'

import Header from '../../ui/Header';
import Loading from "../../ui/Loading";
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const { user } = useAuth();
    const [disabledButtons, setDisabledButtons] = useState({});

    const {data, isLoading} = useQuery(['projects'], () => ProjectService.getProjectList(user.token))
    const { deleteProject } = useDeleteProject(setDisabledButtons);

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
                    data.length ? data.map(project => (
                        <div key={project.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-0 d-flex flex-column position-static">
                                <div className="px-4 pt-4">
                                    <h3 className="mb-2">{project.id}. {project.name}</h3>
                                    <div className="mb-1 text-body-secondary">Репозиторий: <a href={project.repo_link}>{project.repo_link}</a></div>
                                    <div className="d-flex flex-column align-items-baseline">
                                        <Link className='btn btn-sm btn-success mt-2' to={`/projects/${project.id}/tasks`}>Задачи »</Link>
                                        {disabledButtons[project.id] ? (
                                            <button className="btn btn-sm btn-danger mt-2" disabled>
                                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                <span role="status">Удаление...</span>
                                            </button>
                                        ) : (
                                            <button className="btn btn-sm btn-danger mt-2" onClick={() => deleteProject(project.id)}>Удалить <i className="fa-solid fa-trash"></i></button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3 accordion accordion-flush" id={`accordionProject${project.id}`}>
                                    <div className="accordion-item border rounded-bottom">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${project.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${project.id}`}>
                                            Описание
                                        </button>
                                        </h2>
                                        <div id={`flush-collapseOne${project.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordionProject${project.id}`}>
                                            <div className="accordion-body">
                                                <p className='mb-0'>{project.description}</p>
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