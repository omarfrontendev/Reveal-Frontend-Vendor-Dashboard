import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';
import { useTranslation } from 'react-i18next';

type Params = {
  id?: string;
};

export const useDeletePermission = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<void, any, string>({
    mutationFn: async (permissionId) => {
      const url = endpoints.permissions.deletePermission(permissionId);
      await api.delete(url);
    },

    onSuccess: () => {
      toast.success(t("Role deleted successfully"));

      queryClient.invalidateQueries({ queryKey: ['malls'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['mall', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete area'
      );
    },
  });
};
