import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ProjectService } from '../../../services/project.service';

export const useProjectCreate = (setIsLoading, setCreateError) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const projectCreate = async (formData) => {
        try {
            setIsLoading(true);
            setCreateError('');

            const response = await ProjectService.createProject(user.token, formData);
        
            if (response.status === 201) {
                navigate("/projects");
            }
        }
        catch(error) {
            console.error(error.message);

            setCreateError('Неизвестная ошибка! Убедитесь, что все поля заполнены корректно.');
        }
        finally {
            setIsLoading(false);
        }
    };

    return { projectCreate }
}