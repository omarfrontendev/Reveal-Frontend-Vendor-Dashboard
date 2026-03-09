import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { AppDispatch } from '@/app/store';
import type { RegionBody, RegionsTableOptions } from '@/types/regions';
import { fetchRegions } from '@/app/store/features/regions/regionsThunk';
import { useRegionsColumns } from '../components/RegionsColumns';

export const useRegionsTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { regions, loading, total: totalCount, error } = useSelector((state: any) => state.regions);

    // Local state to trigger manual refresh
    const [refreshData, setRefreshData] = useState(false);


    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<RegionsTableOptions>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        areaId: null
    });

    // Fetch regions whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, areaId } = tableOptions;
        dispatch(
            fetchRegions({
                page: pageIndex + 1,
                limit: pageSize,
                search,
                areaId
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

    const onFilterByAreas = useCallback((value) => {
        setTableOptions((prev) => ({
            ...prev,
            areaId: value,
            pageIndex: 0,
        }));
    }, []);

    // Table columns definition
    const columns: ColumnDef<RegionBody>[] = useRegionsColumns(setRefreshData);

    const table = useReactTable({
        columns,
        data: regions,
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
        areaId: tableOptions.areaId,
        onSearch,
        onClearSearch,
        onFilterByAreas
    };
};
