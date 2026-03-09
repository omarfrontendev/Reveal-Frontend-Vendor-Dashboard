import MainTable from "@/components/common/MainTable";
import React, { useCallback } from "react";
import SubRegionsFilters from "./components/filter/Filters";
import { useSubRegionsTableLogic } from "./hooks/useSubRegionsTableLogic";

const MemoizedFilters = React.memo(SubRegionsFilters);

export default function SubRegionsTable() {

    const {
        loading,
        totalCount,
        table,
        regionId,
        errorMsg,
        onSearch,
        onClearSearch,
        onFilterByRegion
    } = useSubRegionsTableLogic();


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
                    onFilterByRegion={onFilterByRegion}
                    regionId={regionId}
                />
            } />
    );
}
