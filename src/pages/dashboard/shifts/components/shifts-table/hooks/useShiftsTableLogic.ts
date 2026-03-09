import { useSelector } from 'react-redux';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

export const useShiftssTableLogic = ({ tableOptions, setTableOptions, columns }: any) => {
    const { shifts, loading, total: totalCount, error } = useSelector((state: any) => state.shifts);

    const onClearSearch = () => {
        setTableOptions({ ...tableOptions, search: '', pageIndex: 0 });
    };

    const table = useReactTable({
        columns,
        data: shifts,
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
        onClearSearch,
    };
};
