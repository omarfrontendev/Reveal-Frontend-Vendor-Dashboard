import { DataGrid } from "@/components/ui/data-grid";
import { Card, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollBar } from "@/components/ui/scroll-area";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import Filter from "../../../../../components/ui/Filter";
import TableSearch from "@/components/ui/table-search";
import ToggleStatusDialog from "./components/ToggleStatusDialog";
import { useTranslation } from "react-i18next";
import { useUsersTableLogic } from "./hooks/useUsersTableLogic";
import { mobileUserRoles } from "@/constants/userRoles";

export default function UsersTable() {

    const { t } = useTranslation();

    const {
        loading,
        totalCount,
        table,
        statusFilter,
        statusList,
        statusDialog,
        roleFilter,
        onRoleFilter,
        setStatusDialog,
        onSearch,
        onClearSearch,
        onStatusFilter,
    } = useUsersTableLogic();

    return (
        <div className="grid gap-2">
            <Card className="p-2">
                <div className="flex items-center gap-2">
                    <div className="relative w-100">
                        <TableSearch
                            placeholder={t("users.searchPlaceholder")}
                            onSearch={onSearch}
                            onClearSearch={onClearSearch} />
                    </div>
                    <div className="w-40">
                        <Filter
                            placeholder={t("filters.status")}
                            value={statusFilter}
                            options={statusList}
                            onChange={onStatusFilter}
                        />
                    </div>
                    <div className="w-60">
                        <Filter
                            placeholder={t("fields.role.label")}
                            value={roleFilter}
                            options={mobileUserRoles}
                            onChange={onRoleFilter}
                        />
                    </div>
                </div>
            </Card>

            <DataGrid
                table={table}
                isLoading={loading}
                loadingMode="skeleton"
                recordCount={totalCount || 0}
                tableLayout={{
                    columnsPinnable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                    cellBorder: true,
                }}
            >
                <Card>
                    <ScrollArea>
                        <DataGridTable />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    <CardFooter>
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>

            <ToggleStatusDialog
                data={statusDialog}
                setData={(data: boolean) => { if (!data) setStatusDialog(false); }}
            />
        </div>
    );
}
