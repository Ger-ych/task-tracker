import { useState } from 'react';
import { useForm } from 'react-hook-form'

import { useLogin } from './useLogin';
import { withoutAuth } from '../../../HOC/withoutAuth';

import ErrorMessage from '../../ui/ErrorMessage'

import '../../../assets/styles/form.css'
import '../../../assets/styles/login.css'

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    })

    const { login } = useLogin(setIsLoading, setLoginError, reset)
    
    return (
        <main className="h-100 d-flex align-items-center justify-content-center">
            <form className='form form-signin w-100 m-auto' onSubmit={handleSubmit(login)}>
                <div className="text-center">
                    <img className="mb-2" src="/favicon.png" alt="" width="54" height="54" />
                    <h1 className="h3 mb-3 fw-normal">Вход</h1>
                </div>

                <div className="form-floating mb-3">
                    <input
                        {...register('username', { required: 'Введите имя пользователя!' })}
                        type="text"
                        className="form-control rounded"
                        id="usernameInput"
                        placeholder="Имя пользователя"
                    />
                    <label htmlFor="usernameInput">Имя пользователя</label>
                    <ErrorMessage error={errors?.username?.message} />
                </div>

                <div className="form-floating">
                    <input
                        {...register('password', { required: 'Введите пароль!' })}
                        type="password"
                        className="form-control rounded mb-0"
                        id="passwordInput"
                        placeholder="Пароль"
                    />
                    <label htmlFor="passwordInput">Пароль</label>
                    <ErrorMessage error={errors?.password?.message} />
                </div>

                {isLoading ? (
                <button className="btn btn-primary w-100 py-2 my-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    <span role="status">Вход...</span>
                </button>
                ) : (
                <button className="btn btn-primary w-100 py-2 my-3" type="submit">
                    Войти
                </button>
                )}

                {loginError && <ErrorMessage error={loginError} />}
            </form>
        </main>
    )
}

export default withoutAuth(Login)