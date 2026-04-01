// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { AreaBody } from '@/types/area';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

interface ApiResponse<T> {
    data: {
        VendorArea: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.VendorArea as T;
};

export const useAreas = (enable: boolean = true) => {

    const { vendorId } = useSelector((state: any) => state.auth);
    const { data, error, isLoading, mutate } = useSWR<AreaBody[]>(enable ? `${endpoints.area.getAreas}?page=1&limit=100&vendorId=${vendorId}` : null, fetcher);

    return {
        areas: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
