import useSWR from 'swr';
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { CreateBoothDto } from '@/types/booths';

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data?.data;
};

export const useSinglesBooth = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<CreateBoothDto>(
    id ? endpoints.booths.getBoothById(id) : null,
    fetcher
  );

  return {
    booth: data,
    isLoading,
    isError: error,
    mutate,
  };
};
