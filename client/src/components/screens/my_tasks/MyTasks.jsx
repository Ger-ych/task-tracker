import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TaskService } from '../../../services/task.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyDeveloper } from '../../../HOC/onlyDeveloper'

import Header from '../../ui/Header';
import Loading from "../../ui/Loading";
import { Link } from 'react-router-dom';

const MyTasks = () => {
    const { user } = useAuth();

    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery(['my_tasks'], () => TaskService.getMyTasks(user.token))

    const setTaskDoneMutation = useMutation((taskId) => TaskService.setTaskDone(user.token, taskId), {
        onSuccess: () => {
            queryClient.invalidateQueries('my_tasks');
        },
        onError: (err) => {
            console.error(err.message)
        }
    });

    const handleSetTaskDone = (taskId) => {
        
        setTaskDoneMutation.mutate(taskId);
    };

    return (
        <main className='container'>
            <Header />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Мои задачи</li>
                </ol>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                {
                    data ? data.map(task => (
                        <div key={task.id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                {task.is_done ? (
                                    <strong className="d-inline-block mb-2 text-success-emphasis">Выполнено</strong>
                                ) : (
                                    <strong className="d-inline-block mb-2 text-warning-emphasis">В работе</strong>
                                )}
                                <h3 className="mb-2">{task.title}</h3>
                                <div className="mb-1 text-body-secondary">Проект: {task.project.name}</div>
                                <div className="mb-1 text-body-secondary">Репозиторий: <a href={task.project.repo_link}>{task.project.repo_link}</a></div>

                                <div className="mt-3 accordion accordion-flush" id={`accordionTask${task.id}`}>
                                    <div className="accordion-item border">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${task.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${task.id}`}>
                                            Подробнее
                                        </button>
                                        </h2>
                                        <div id={`flush-collapseOne${task.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordionTask${task.id}`}>
                                            <div className="accordion-body">
                                                <p><b>Проект ({task.project.name}):</b> {task.project.description}</p>
                                                <p><b>Описание задачи:</b><br /> {task.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {!task.is_done ? (
                                    <button className="btn btn-success w-100 mt-2" onClick={() => handleSetTaskDone(task.id)}>Задача выполнена <i className="fa-solid fa-check"></i></button>
                                ) : null}
                            </div>
                        </div>
                    ))
                    : <h3 className="">У вас нет задач</h3>
                }
                </>
            )}
        </main>
    )
}

export default onlyDeveloper(MyTasks)