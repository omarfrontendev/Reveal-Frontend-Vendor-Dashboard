import { useRegionsTableLogic } from "@/pages/dashboard/regions/components/regions-table/hooks/useRegionsTableLogic";
import MainTable from "@/components/common/MainTable";
import React, { useCallback } from "react";
import RegionsFilters from "./components/filter/Filters";

const MemoizedFilters = React.memo(RegionsFilters);

export default function RegionsTable() {

    const {
        loading,
        totalCount,
        table,
        areaId,
        errorMsg,
        onSearch,
        onClearSearch,
        onFilterByAreas
    } = useRegionsTableLogic();

    const handleSearch = useCallback((value: string) => {
        onSearch(value);
    }, [onSearch]);

    const handleClearSearch = useCallback(() => {
        onClearSearch();
    }, [onClearSearch]);


    return (
        <MainTable
            errorMsg={errorMsg}
            loading={loading}
            totalCount={totalCount}
            table={table}
            TableFilters={
                <MemoizedFilters
                    onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    placeholder="regions.searchPlaceholder"
                    onFilterByAreas={onFilterByAreas}
                    areaId={areaId}
                />
            } />
    );
}
