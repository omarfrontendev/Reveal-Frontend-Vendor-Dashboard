import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { AppDispatch } from '@/app/store';
import type { SubRegionBody, SubregionsTableOptions } from '@/types/sub-regions';
import { fetchSubRegions } from '@/app/store/features/sub-regions/sub-regionsThunk';
import { useSubRegionsColumns } from '@/pages/dashboard/sub-regions/components/sub-regions-table/components/SubRegionsColumns';

export const useSubRegionsTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { subRegions, loading, total: totalCount, error } = useSelector((state: any) => state.subRegions);

    // Local state to trigger manual refresh
    const [refreshData, setRefreshData] = useState(false);

    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<SubregionsTableOptions>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        regionId: null
    });

    // Fetch sub-regions whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, regionId } = tableOptions;

        dispatch(
            fetchSubRegions({
                page: pageIndex + 1,
                limit: pageSize,
                search: search,
                regionId
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

    const onFilterByRegion = useCallback((value) => {
        setTableOptions((prev) => ({
            ...prev,
            regionId: value,
            pageIndex: 0,
        }));
    }, []);

    const columns: ColumnDef<SubRegionBody>[] = useSubRegionsColumns(setRefreshData);

    const table = useReactTable({
        columns,
        data: subRegions,
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
        regionId: tableOptions?.regionId,
        onSearch,
        onClearSearch,
        onFilterByRegion
    };
};
