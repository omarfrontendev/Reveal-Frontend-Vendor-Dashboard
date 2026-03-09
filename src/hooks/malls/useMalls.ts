// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { MallBody } from '@/types/malls';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        Mall: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.Mall as T;
};

export const useAllMalls = () => {
    const { data, error, isLoading, mutate } = useSWR<MallBody[]>(`${endpoints.malls.getMalls}?page=1&limit=100`, fetcher);

    return {
        malls: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};

export const useMalls = (subRegionId?: number) => {
    const { data, error, isLoading, mutate } = useSWR<MallBody[]>(subRegionId ? `${endpoints.malls.getMalls}?page=1&limit=100&subRegionId=${subRegionId}` : null, fetcher);

    return {
        malls: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
