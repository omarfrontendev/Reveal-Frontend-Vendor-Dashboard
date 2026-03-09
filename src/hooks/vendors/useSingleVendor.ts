import useSWR from 'swr';
import { api } from '@/api';
import { endpoints } from '@/api/endpoints';
import type { Vendor } from '@/types/vendors';

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data?.data;
};

export const useSingleVendor = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<Vendor>(
    id ? endpoints.vendors.getVendorById(id) : null,
    fetcher
  );

  return {
    vendor: data,
    isLoading,
    isError: error,
    mutate,
  };
};
