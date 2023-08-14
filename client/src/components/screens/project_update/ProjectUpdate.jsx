import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectService } from '../../../services/project.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager';

import ErrorMessage from '../../ui/ErrorMessage'
import Header from '../../ui/Header';
import Loading from '../../ui/Loading';

import '../../../assets/styles/form.css'
import { useProjectUpdate } from './useProjectUpdate';

const ProjectUpdate = () => {
    const { user } = useAuth();
    const { id } = useParams();

    const [updateError, setUpdateError] = useState('');
    const [projectData, setProjectData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: 'onChange'
    })

    useEffect(() => {
        async function getProjectData() {
            try {
                const project_data = await ProjectService.getProjectData(user.token, id);
                setProjectData(project_data);

                setValue("name", project_data.name)
                setValue("description", project_data.description)
                setValue("repo_link", project_data.repo_link)
            } catch (error) {
                console.error(error.message);
            }
        }

        getProjectData();
    }, [user.token]);

    const { projectUpdate } = useProjectUpdate(id, setIsLoading, setUpdateError);
    
    return (
        <main className="h-100 d-flex align-items-center justify-content-center flex-column">
            <Header />
            {projectData ? (
            <form className='form w-100 m-auto' onSubmit={handleSubmit(projectUpdate)}>
                <div className="text-center">
                    <img className="mb-2" src="/favicon.png" alt="" width="54" height="54" />
                    <h1 className="h3 mb-3 fw-normal">Изменение проекта {id}</h1>
                </div>

                <div className="form-floating mb-3">
                    <input
                        {...register('name', { required: 'Введите название проекта!' })}
                        type="text"
                        className="form-control rounded"
                        id="nameInput"
                        placeholder="Название проекта"
                    />
                    <label htmlFor="nameInput">Название проекта</label>
                    <ErrorMessage error={errors?.name?.message} />
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register('description', { required: 'Введите описание проекта!' })}
                        type="text"
                        className="form-control rounded"
                        id="descriptionInput"
                        placeholder="Описание проекта"
                    />
                    <label htmlFor="descriptionInput">Описание проекта</label>
                    <ErrorMessage error={errors?.description?.message} />
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register('repo_link', { required: 'Введите ссылку на репозиторий проекта!' })}
                        type="text"
                        className="form-control rounded"
                        id="repo_linkInput"
                        placeholder="Ссылка на репозиторий проекта"
                    />
                    <label htmlFor="nameInput">Ссылка на репозиторий проекта</label>
                    <ErrorMessage error={errors?.repo_link?.message} />
                </div>

                {isLoading ? (
                <button className="btn btn-primary w-100 py-2 my-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Отправка...</span>
                </button>
                ) : (
                <button className="btn btn-primary w-100 py-2 my-3" type="submit">
                    Отправить
                </button>
                )}

                {updateError && <ErrorMessage error={updateError} />}
            </form>
            ) : (
                <div className="w-100 m-auto">
                    <Loading />
                </div>
            )}
        </main>
    )
}

export default onlyAdminOrManager(ProjectUpdate)