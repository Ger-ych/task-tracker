import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth";
import { AuthService } from "../../../services/auth.service";

export const useLogin = (setIsLoading, setLoginError, reset) => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            setIsLoading(true);
            setLoginError('');

            const response = await AuthService.login(formData);
        
            if (response.status === 200) {
                setUser(response.data);
                navigate("/");
            }
        }
        catch(error) {
            console.error(error.message);

            reset({'password': ''});
            setLoginError('Неправильное имя пользователя или пароль!');
        }
        finally {
            setIsLoading(false);
        }
    };

    return { login }
}