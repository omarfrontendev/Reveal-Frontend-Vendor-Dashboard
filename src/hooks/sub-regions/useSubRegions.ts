// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { SubRegionBody } from '@/types/sub-regions';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        VendorSubRegion: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.VendorSubRegion as T;
};

export const useAllSubRegions = () => {
    const { data, error, isLoading, mutate } = useSWR<SubRegionBody[]>(`${endpoints.subRegions.getSubRegions}?page=1&limit=100`, fetcher);

    return {
        subRegions: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};

export const useSubRegions = (regionId?: number) => {
    const { data, error, isLoading, mutate } = useSWR<SubRegionBody[]>(regionId ? `${endpoints.subRegions.getSubRegions}?page=1&limit=100&regionId=${regionId}` : null, fetcher);

    return {
        subRegions: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
