import { useForm } from 'react-hook-form'
import '../../../assets/styles/login.css'
import ErrorMessage from '../../ui/ErrorMessage'

const Login = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    })
    
    return (
        <main className="h-100 d-flex align-items-center justify-content-center">
            <form className='form-signin w-100 m-auto'>
                <img className="mb-4" src="./favicon.png" alt="" width="54" height="54" />
                <h1 className="h3 mb-3 fw-normal">Вход</h1>

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

                <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Войти</button>
            </form>
        </main>
    )
}

export default Login