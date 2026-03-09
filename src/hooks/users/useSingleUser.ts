import useSWR from 'swr';
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { User } from '@/types/users';

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data?.data;
};

export const useSingleUser = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<User>(
    id ? endpoints.users.getgetUserById(id) : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};
