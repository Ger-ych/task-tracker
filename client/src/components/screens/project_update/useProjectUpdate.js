import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ProjectService } from '../../../services/project.service';

export const useProjectUpdate = (id, setIsLoading, setUpdateError) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const projectUpdate = async (formData) => {
        try {
            setIsLoading(true);
            setUpdateError('');

            const response = await ProjectService.updateProject(user.token, id, formData);
        
            if (response.status === 200) {
                navigate("/projects");
            }
        }
        catch(error) {
            console.error(error.message);

            setUpdateError('Неизвестная ошибка! Убедитесь, что все поля заполнены корректно.');
        }
        finally {
            setIsLoading(false);
        }
    };

    return { projectUpdate }
}