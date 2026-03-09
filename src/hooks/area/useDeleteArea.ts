import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';
import { useTranslation } from 'react-i18next';

type Params = {
  id?: string;
};

export const useDeleteArea = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<void, any, string>({
    mutationFn: async (areaId) => {
      const url = endpoints.area.deleteArea(areaId);
      await api.delete(url);
    },

    onSuccess: () => {
      toast.success(t("areas.areaSuccessDeleted"));

      queryClient.invalidateQueries({ queryKey: ['areas'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['area', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete area'
      );
    },
  });
};
