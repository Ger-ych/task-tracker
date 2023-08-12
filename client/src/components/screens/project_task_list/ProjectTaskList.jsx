import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager'

import Header from '../../ui/Header';
import Loading from "../../ui/Loading";
import { Link, useParams } from 'react-router-dom';

const ProjectTaskList = () => {
    const { user } = useAuth();
    const { id } = useParams();

    // const { dataProject, isLoadingProject } = useQuery([`project tasks`], () => ProjectServiceService.getById(user.token, id))
    const { data, isLoading } = useQuery([`project tasks ${id}`], () => TaskService.getProjectTaskList(user.token, id))

    return (
        <main className='container'>
            <Header />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                    <li className="breadcrumb-item"><Link to="/projects">Проекты</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Задачи проекта {id}</li>
                </ol>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                {
                    data.length ? data.map(task => (
                        <div key={task.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-0 d-flex flex-column position-static">
                                <div className="px-4 pt-4">
                                    {task.is_done ? (
                                        <strong className="d-inline-block mb-2 text-success-emphasis">Выполнено</strong>
                                    ) : (
                                        <strong className="d-inline-block mb-2 text-warning-emphasis">В работе</strong>
                                    )}
                                    <h3 className="mb-2">{task.title}</h3>
                                </div>

                                <div className="mt-3 accordion accordion-flush" id={`accordionTask${task.id}`}>
                                    <div className="accordion-item border rounded-bottom">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${task.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${task.id}`}>
                                            Описание
                                        </button>
                                        </h2>
                                        <div id={`flush-collapseOne${task.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordionTask${task.id}`}>
                                            <div className="accordion-body">
                                                <p className='mb-0'>{task.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <h3 className="">У этого проекта нет задач</h3>
                }
                </>
            )}
        </main>
    )
}

export default onlyAdminOrManager(ProjectTaskList)