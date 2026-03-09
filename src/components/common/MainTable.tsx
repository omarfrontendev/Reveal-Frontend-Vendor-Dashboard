import { Card, CardFooter } from "../ui/card";
import { DataGrid } from "../ui/data-grid";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DataGridTable } from "../ui/data-grid-table";
import { ScrollBar } from "../ui/scroll-area";
import { DataGridPagination } from "../ui/data-grid-pagination";
import ErrorMessage from "./ErrorMessage";

export default function MainTable({ table, loading, totalCount, errorMsg, TableFilters }) {

    if (errorMsg) return (
        <div className="w-full flex items-center justify-center">
            <ErrorMessage message={errorMsg} />
        </div>
    )

    return (
        <div className="grid gap-2">
            {TableFilters}
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

                    {totalCount > 0 && <CardFooter className="border-t">
                        <DataGridPagination />
                    </CardFooter>}
                </Card>
            </DataGrid>
        </div>
    )
}