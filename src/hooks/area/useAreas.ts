// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { AreaBody } from '@/types/area';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        Area: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.Area as T;
};

export const useAreas = () => {
    const { data, error, isLoading, mutate } = useSWR<AreaBody[]>(`${endpoints.area.getAreas}?page=1&limit=100`, fetcher);

    return {
        areas: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
