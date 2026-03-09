// src/hooks/useUpsertShift.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'sonner';
import { endpoints } from '@/api/endpoints';
import type { CreateShiftResponse } from '@/types/shifts';
import type { User } from '@/types/users';

type Params = {
  id?: string;
};

export const useUpsertVendor = ({ id }: Params = {}) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  return useMutation<CreateShiftResponse, any, User | any>({
    mutationFn: async (body) => {
      const url = isEdit
        ? endpoints.vendors.updateVendor(id!)
        : endpoints.vendors.createVendor;

      const method = isEdit ? 'patch' : 'post';

      const { data } = await api[method]<CreateShiftResponse>(url, body);
      return data;
    },

    onSuccess: () => {
      toast.success(
        isEdit ? 'Vendor updated successfully' : 'Vendor created successfully'
      );

      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (id) {
        queryClient.invalidateQueries({ queryKey: ['users', id] });
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to save area'
      );
    },
  });
};
