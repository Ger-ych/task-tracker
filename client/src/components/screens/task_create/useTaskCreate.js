import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { TaskService } from '../../../services/task.service';

export const useTaskCreate = (setIsLoading, setCreateError) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const taskCreate = async (formData) => {
        try {
            setIsLoading(true);
            setCreateError('');

            const response = await TaskService.createTask(user.token, formData);
            
            console.log("!!!!");
            if (response.status === 201) {
                navigate(`/projects/${formData.project_id}/tasks`);
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

    return { taskCreate }
}