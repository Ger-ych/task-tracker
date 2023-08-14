import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { TaskService } from '../../../services/task.service';

export const useTaskUpdate = (id, setIsLoading, setUpdateError) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const taskUpdate = async (formData) => {
        try {
            setIsLoading(true);
            setUpdateError('');

            const response = await TaskService.updateTask(user.token, id, formData);
            
            if (response.status === 200) {
                navigate(`/projects/${formData.project_id}/tasks`);
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

    return { taskUpdate }
}