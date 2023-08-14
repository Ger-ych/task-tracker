import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../../hooks/useAuth"
import { TaskService } from '../../../services/task.service';

export const useDeleteTask = (setDisabledButtons, project_id) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    
    const deleteTaskMutation = useMutation((task_id) => TaskService.deleteTask(user.token, task_id), {
        onSuccess: () => {
            queryClient.invalidateQueries(`projects tasks ${project_id}`);
        },
        onError: (err) => {
            console.error(err.message)
        }
    });

    const deleteTask = async (task_id) => {
        setDisabledButtons(prevState => ({
            ...prevState,
            [task_id]: true,
        }));

        deleteTaskMutation.mutateAsync(task_id);
    };

    return { deleteTask }
}