// src/hooks/useUsers.ts
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { ShiftBody } from '@/types/shifts';
import { cleanAndTrim } from '@/utils/clean-data';
import useSWR from 'swr';
interface ApiResponse<T> {
    data: {
        VendorShift: T;
    };
}

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data?.data?.VendorShift as T;
};

export const useShifts = (enable: boolean = true, boothId?: number) => {
    const payload = {
        page: 1,
        limit: 100,
        boothId
    };

    const cleanedParams = cleanAndTrim(payload);
    const { data, error, isLoading, mutate } = useSWR<ShiftBody[]>(enable ? `${endpoints.shifts.getShifts}?${new URLSearchParams(cleanedParams).toString()}` : null, fetcher);

    return {
        shifts: data || [],
        isLoading,
        isError: error,
        mutate,
    };
};
