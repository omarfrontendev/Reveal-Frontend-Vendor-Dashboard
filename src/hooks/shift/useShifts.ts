// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { ApiResponse } from '@/types/api';
import type { ShiftBody } from '@/types/shifts';
import useSWR from 'swr';

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data as T;
};

export const useShifts = () => {
    const { data, error, isLoading, mutate } = useSWR<ShiftBody[]>(`${endpoints.shifts.getShifts}?page=1&limit=100`, fetcher);

    return {
        shifts: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
