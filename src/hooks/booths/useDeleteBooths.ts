import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';

type Params = {
  id?: string;
};

export const useDeleteBooth = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, string>({
    mutationFn: async (boothId) => {
      const url = endpoints.booths.deleteBooth(boothId);
      await api.delete(url);
    },

    onSuccess: () => {
      toast.success('Booth deleted successfully');

      queryClient.invalidateQueries({ queryKey: ['booths'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['mall', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete booth'
      );
    },
  });
};
