import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { AppDispatch } from '@/app/store';
import type { BoothsTableOptions, CreateBoothDto } from '@/types/booths';
import { fetchBooths } from '@/app/store/features/booths/boothsThunk';
import { useBoothsColumns } from '@/pages/dashboard/booths/components/booth-table/components/BoothsColumns';

export const useBoothsTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { booths, loading, total: totalCount, error } = useSelector((state: any) => state.booths);

    // Local state to trigger manual refresh
    const [refreshData, setRefreshData] = useState(false);

    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<BoothsTableOptions>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        mallId: null
    });

    // Fetch malls whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, mallId } = tableOptions;

        dispatch(
            fetchBooths({
                page: pageIndex + 1,
                limit: pageSize,
                search: search,
                mallId,
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

    const onFilterByMall = useCallback((value) => {
        setTableOptions((prev) => ({
            ...prev,
            mallId: value,
            pageIndex: 0,
        }));
    }, []);

    const columns: ColumnDef<CreateBoothDto>[] = useBoothsColumns(setRefreshData);

    const table = useReactTable({
        columns,
        data: booths,
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
        mallId: tableOptions?.mallId,
        onFilterByMall,
        onSearch,
        onClearSearch,
    };
};
