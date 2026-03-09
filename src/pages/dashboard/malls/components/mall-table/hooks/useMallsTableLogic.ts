import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { AppDispatch } from '@/app/store';
import type { MallBody, MallsTableOptions } from '@/types/malls';
import { fetchMalls } from '@/app/store/features/malls/mallsThunk';
import { useMallsColumns } from '../components/MallsColumns';

export const useMallsTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { malls, loading, total: totalCount, error } = useSelector((state: any) => state.malls);

    // Local state to trigger manual refresh
    const [refreshData, setRefreshData] = useState(false);

    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<MallsTableOptions>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        subRegionId: null
    });

    // Fetch malls whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, subRegionId } = tableOptions;

        dispatch(
            fetchMalls({
                page: pageIndex + 1,
                limit: pageSize,
                search: search,
                subRegionId
            })
        );
    }, [dispatch, tableOptions, refreshData]);

    const onFilterBySubRegion = useCallback((value) => {
        setTableOptions((prev) => ({
            ...prev,
            subRegionId: value,
            pageIndex: 0,
        }));
    }, []);

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

    const columns: ColumnDef<MallBody>[] = useMallsColumns(setRefreshData);

    const table = useReactTable({
        columns,
        data: malls,
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
        subRegionId: tableOptions?.subRegionId,
        onFilterBySubRegion,
        onSearch,
        onClearSearch,
    };
};
