import { useShiftsColumns } from "./components/ShiftsColumns";
import { useShiftssTableLogic } from "@/pages/dashboard/shifts/components/shifts-table/hooks/useShiftsTableLogic";
import MainTable from "@/components/common/MainTable";

export default function ShiftsTable({ tableOptions, setTableOptions, setRefreshData }: any) {
    const columns = useShiftsColumns(setRefreshData);

    const {
        loading,
        totalCount,
        table,
        errorMsg
    } = useShiftssTableLogic({ tableOptions, setTableOptions, columns });

    return (
        <MainTable
            errorMsg={errorMsg}
            loading={loading}
            totalCount={totalCount}
            table={table}
            TableFilters={() => { }}
        />
    );
}
