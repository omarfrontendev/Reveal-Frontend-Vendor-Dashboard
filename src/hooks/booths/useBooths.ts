// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { User } from '@/types/users';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        VendorBooth: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.VendorBooth as T;
};

export const useBooths = (enable: boolean = true) => {
    const { data, error, isLoading, mutate } = useSWR<User[]>(enable ? `${endpoints.booths.getBooths}?page=1&limit=100` : null, fetcher);

    return {
        booths: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
