import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';

type Params = {
  id?: string;
};

export const useDeleteUser = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, string>({
    mutationFn: async (userId) => {
      const url = endpoints.users.deleteUser(userId);
      await api.delete(url);
    },

    onSuccess: () => {
      toast.success('User deleted successfully');

      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['users', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete user'
      );
    },
  });
};
