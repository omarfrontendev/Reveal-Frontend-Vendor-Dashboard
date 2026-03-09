import useSWR from 'swr';
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { ShiftBody } from '@/types/shifts';

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data?.data;
};

export const useSingleShift = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<ShiftBody>(
    id ? endpoints.shifts.getShiftById(id) : null,
    fetcher
  );

  return {
    shift: data,
    isLoading,
    isError: error,
    mutate,
  };
};
