import React, { useCallback } from "react";
import { useAreasTableLogic } from "./hooks/useAreasTableLogic";
import MainTable from "@/components/common/MainTable";
import AreasFilters from "./components/Filters";

const MemoizedFilters = React.memo(AreasFilters);

function AreaTable() {
    const {
        loading,
        totalCount,
        table,
        errorMsg,
        onSearch,
        onClearSearch,
    } = useAreasTableLogic();

    const handleSearch = useCallback((value: string) => {
        onSearch(value);
    }, [onSearch]);

    const handleClearSearch = useCallback(() => {
        onClearSearch();
    }, [onClearSearch]);

    return (
        <MainTable
            TableFilters={
                <MemoizedFilters
                    onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    placeholder="areas.searchPlaceholder"
                />
            }
            loading={loading}
            errorMsg={errorMsg}
            totalCount={totalCount}
            table={table}
        />
    );
}

export default React.memo(AreaTable);