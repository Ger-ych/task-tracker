import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../../hooks/useAuth"
import { TaskService } from '../../../services/task.service';

export const useSetTaskDone = (setDisabledButtons) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    
    const setTaskDoneMutation = useMutation((taskId) => TaskService.setTaskDone(user.token, taskId), {
        onSuccess: () => {
            queryClient.invalidateQueries('my tasks');
        },
        onError: (err) => {
            console.error(err.message)
        }
    });

    const setTaskDone = async (taskId) => {
        setDisabledButtons(prevState => ({
            ...prevState,
            [taskId]: true,
        }));

        setTaskDoneMutation.mutateAsync(taskId);
    };

    return { setTaskDone }
}