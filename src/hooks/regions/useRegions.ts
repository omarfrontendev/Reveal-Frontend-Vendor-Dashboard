// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { RegionBody } from '@/types/regions';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        Region: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.Region as T;
};

export const useAllRegions = () => {
    const { data, error, isLoading, mutate } = useSWR<RegionBody[]>(`${endpoints.regions.getRegions}?page=1&limit=100`, fetcher);

    return {
        regions: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};

export const useRegions = (areaId?: number) => {
    const { data, error, isLoading, mutate } = useSWR<RegionBody[]>(areaId ? `${endpoints.regions.getRegions}?page=1&limit=100&areaId=${areaId}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: true,
        dedupingInterval: 0,
    });

    return {
        regions: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
