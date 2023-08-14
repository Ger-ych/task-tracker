import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

import { ProjectService } from '../../../services/project.service';
import { DeveloperService } from '../../../services/developer.service';
import { useAuth } from '../../../hooks/useAuth';
import { useTaskCreate } from './useTaskCreate';
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager';

import ErrorMessage from '../../ui/ErrorMessage'
import Header from '../../ui/Header';
import Loading from '../../ui/Loading';

import '../../../assets/styles/form.css'

const TaskCreate = () => {
    const { user } = useAuth();

    const [createError, setCreateError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    });
    
    const { taskCreate } = useTaskCreate(setIsLoading, setCreateError);

    const [projectList, setProjectList] = useState('');
    const [developerList, setDeveloperList] = useState('');
    useEffect(() => {
        async function getData() {
            try {
                const project_list = await ProjectService.getProjectList(user.token);
                setProjectList(project_list);

                const developer_list = await DeveloperService.getDeveloperList(user.token);
                setDeveloperList(developer_list);
            } catch (error) {
                console.error(error.message);
            }
        }

        getData();
    }, [user.token]);
    
    return (
        <main className="h-100 d-flex align-items-center justify-content-center flex-column">
            <Header />
            {(projectList && developerList) ? (
            <form className='form w-100 m-auto' onSubmit={handleSubmit(taskCreate)}>
                <div className="text-center">
                    <img className="mb-2" src="/favicon.png" alt="" width="54" height="54" />
                    <h1 className="h3 mb-3 fw-normal">Создание задания</h1>
                </div>

                <div className="form-floating mb-3">
                    <input
                        {...register('title', { required: 'Введите заголовок задания!' })}
                        type="text"
                        className="form-control rounded"
                        id="titleInput"
                        placeholder="Заголовок задания"
                    />
                    <label htmlFor="nameInput">Заголовок задания</label>
                    <ErrorMessage error={errors?.title?.message} />
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register('text', { required: 'Введите текст задания!' })}
                        type="text"
                        className="form-control rounded"
                        id="textInput"
                        placeholder="Текст задания"
                    />
                    <label htmlFor="textInput">Текст задания</label>
                    <ErrorMessage error={errors?.text?.message} />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select py-3"
                        {...register('project_id', { required: 'Выберите проект' })}
                    >
                        <option disabled>Выберите проект</option>
                        {projectList.map(project => (
                            <option key={project.id} value={project.id}>{project.id}. {project.name}</option>
                        ))}
                    </select>
                    <ErrorMessage error={errors?.project_id?.message} />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select py-3"
                        {...register('developer_id', { required: 'Выберите разработчика' })}
                    >
                        <option disabled>Выберите разработчика</option>
                        {developerList.map(developer => (
                            <option key={developer.id} value={developer.id}>{developer.username}</option>
                        ))}
                    </select>
                    <ErrorMessage error={errors?.developer_id?.message} />
                </div>

                {isLoading ? (
                <button className="btn btn-primary w-100 py-2 my-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Создание...</span>
                </button>
                ) : (
                <button className="btn btn-primary w-100 py-2 my-3" type="submit">
                    Создать
                </button>
                )}

                {createError && <ErrorMessage error={createError} />}
            </form>
            ) : (
                <div className="w-100 m-auto">
                    <Loading />
                </div>
            )}
        </main>
    )
}

export default onlyAdminOrManager(TaskCreate)