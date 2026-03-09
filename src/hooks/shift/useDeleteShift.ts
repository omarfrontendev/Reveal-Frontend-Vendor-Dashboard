import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';
import { useTranslation } from 'react-i18next';

type Params = {
  id?: string;
};

export const useDeleteShfit = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<void, any, string>({
    mutationFn: async (shiftId) => {
      const url = endpoints.shifts.deleteShift(shiftId);
      await api.delete(url);
    },

    onSuccess: () => {
      toast.success(t("shifts.SuccessDeleted"));

      queryClient.invalidateQueries({ queryKey: ['shifts'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['shifts', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete area'
      );
    },
  });
};
