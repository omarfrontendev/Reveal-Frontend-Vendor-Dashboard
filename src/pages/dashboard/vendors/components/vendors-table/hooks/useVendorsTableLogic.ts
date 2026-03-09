import { useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import type { AppDispatch, RootState } from "@/app/store";
import { useUsersColumns } from "../components/UsersColumns";
import type { User } from "@/types/users";
import { dashboardUserRoles } from "@/constants/userRoles";
import { fetchVendors } from "@/app/store/features/vendors/vendorsThunk";
import { vendorStatus } from "@/constants/vendorStatus";

export const useVendorsTableLogic = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [statusDialog, setStatusDialog] = useState(null);

    // Select users state from Redux store
    const { vendors, loading, total } = useSelector((state: RootState) => state.vendors);

    // Local state to trigger manual refresh
    const [refreshData] = useState(false);

    // Table options state: pagination, search, and status filter
    // @@TODO FIX TO USE GetUsersPayload
    const [tableOptions, setTableOptions] = useState<any>({
        pageIndex: 0,
        pageSize: 10,
        search: "",
        status: null,
    });

    // Fetch users whenever table options or refreshData changes
    useEffect(() => {
        const { pageIndex, pageSize, search, status } = tableOptions;

        dispatch(
            fetchVendors({
                page: pageIndex + 1, // API expects 1-based page
                limit: pageSize,
                search: search || undefined,
                status,
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

    const onStatusFilter = useCallback((value: string | null) => {
        setTableOptions((prev) => ({
            ...prev,
            status: value,
            pageIndex: 0, // reset page on filter change
        }));
    }, []);

    // Memoized current selected status value for UI display
    const statusFilter = useMemo(
        () => {
            return vendorStatus.find((option) => option.value === tableOptions.status)?.value
        },
        [tableOptions.status]
    );

    // Memoized current selected status value for UI display
    const roleFilter = useMemo(
        () => tableOptions.roles?.length === 1 && dashboardUserRoles.find((option) => option.value === tableOptions.roles[0])?.value,
        [tableOptions.roles]
    );

    // Table columns definition
    const columns: ColumnDef<User>[] = useUsersColumns(setStatusDialog);

    // Initialize react-table instance with server-side pagination
    const table = useReactTable({
        columns,
        data: vendors,
        pageCount: Math.ceil((total || 0) / tableOptions.pageSize),
        state: {
            pagination: {
                pageIndex: tableOptions.pageIndex,
                pageSize: tableOptions.pageSize,
            },
        },
        onPaginationChange: (updater) => {
            setTableOptions((prev) => {
                const newPagination =
                    typeof updater === "function"
                        ? updater({
                            pageIndex: prev.pageIndex,
                            pageSize: prev.pageSize,
                        })
                        : updater;

                return {
                    ...prev,
                    pageIndex: newPagination.pageIndex,
                    pageSize: newPagination.pageSize,
                };
            });
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true, // server-side pagination
    });

    return {
        table,
        totalCount: total,
        loading,
        statusFilter,
        statusList: vendorStatus,
        statusDialog,
        roleFilter,
        onSearch,
        onClearSearch,
        onStatusFilter,
        setStatusDialog,
    };
};
