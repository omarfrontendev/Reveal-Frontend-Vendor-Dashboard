import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { AppDispatch } from '@/app/store';
import type { AreaBody, AreasTableOptions } from '@/types/area';
import { fetchAreas } from '@/app/store/features/area/areaThunk';
import { useAreasColumns } from '../components/AreasColumns';

export const useAreasTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { areas, loading, total: totalCount, error } = useSelector((state: any) => state.area);
    const { vendorId } = useSelector((state: any) => state.auth);

    // Local state to trigger manual refresh
    const [refreshData, setRefreshData] = useState(false);

    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<AreasTableOptions>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        vendorId,
    });

    // Fetch areas whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, vendorId } = tableOptions;

        dispatch(
            fetchAreas({
                page: pageIndex + 1, // API expects 1-based page
                limit: pageSize,
                search: search || undefined,
                vendorId
            })
        );
    }, [dispatch, tableOptions, refreshData]);

    // Debounced search function to reduce API calls
    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setTableOptions((prev) => ({
                    ...prev,
                    search: value,
                    pageIndex: 0, // reset to first page
                }));
            }, 500),
        []
    );

    const onSearch = useCallback(
        (value: string) => debouncedSearch(value),
        [debouncedSearch]
    );

    const onClearSearch = useCallback(() => {
        setTableOptions((prev) => ({
            ...prev,
            search: "",
            pageIndex: 0,
        }));
    }, []);

    // Table columns definition
    const columns: ColumnDef<AreaBody>[] = useAreasColumns(setRefreshData);

    const table = useReactTable({
        columns,
        data: areas,
        pageCount: Math.ceil((totalCount || 0) / tableOptions?.pageSize),
        state: {
            pagination: {
                pageIndex: tableOptions?.pageIndex,
                pageSize: tableOptions?.pageSize,
            },
        },
        onPaginationChange: setTableOptions,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
    });

    return {
        table,
        totalCount,
        loading,
        errorMsg: error?.message,
        onSearch,
        onClearSearch,
    };
};
