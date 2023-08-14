import { useState } from 'react';
import { useForm } from 'react-hook-form'

import { useProjectCreate } from './useProjectCreate';
import { onlyAdminOrManager } from '../../../HOC/onlyAdminOrManager';

import ErrorMessage from '../../ui/ErrorMessage'
import Header from '../../ui/Header';

import '../../../assets/styles/form.css'

const ProjectCreate = () => {
    const [createError, setCreateError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    });
    
    const { projectCreate } = useProjectCreate(setIsLoading, setCreateError);
    
    return (
        <main className="h-100 d-flex align-items-center justify-content-center flex-column">
            <Header />
            <form className='form w-100 m-auto' onSubmit={handleSubmit(projectCreate)}>
                <div className="text-center">
                    <img className="mb-2" src="/favicon.png" alt="" width="54" height="54" />
                    <h1 className="h3 mb-3 fw-normal">Создание проекта</h1>
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
                    <span role="status">Создание...</span>
                </button>
                ) : (
                <button className="btn btn-primary w-100 py-2 my-3" type="submit">
                    Создать
                </button>
                )}

                {createError && <ErrorMessage error={createError} />}
            </form>
        </main>
    )
}

export default onlyAdminOrManager(ProjectCreate)