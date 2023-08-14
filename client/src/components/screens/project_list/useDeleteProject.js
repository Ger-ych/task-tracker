import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../../hooks/useAuth"
import { ProjectService } from '../../../services/project.service';

export const useDeleteProject = (setDisabledButtons) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    
    const deleteProjectMutation = useMutation((project_id) => ProjectService.deleteProject(user.token, project_id), {
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
        onError: (err) => {
            console.error(err.message)
        }
    });

    const deleteProject = async (project_id) => {
        setDisabledButtons(prevState => ({
            ...prevState,
            [project_id]: true,
        }));

        deleteProjectMutation.mutateAsync(project_id);
    };

    return { deleteProject }
}