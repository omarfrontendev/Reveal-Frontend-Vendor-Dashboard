import MainTable from "@/components/common/MainTable";
import { useMallsTableLogic } from "@/pages/dashboard/malls/components/mall-table/hooks/useMallsTableLogic";
import React, { useCallback } from "react";
import MallsFilters from "./components/filter/Filters";

const MemoizedFilters = React.memo(MallsFilters);

export default function MallTable() {

    const {
        loading,
        totalCount,
        table,
        errorMsg,
        subRegionId,
        onFilterBySubRegion,
        onSearch,
        onClearSearch
    } = useMallsTableLogic();

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
                    placeholder="subregions.searchPlaceholder"
                    onFilterBySubRegion={onFilterBySubRegion}
                    subRegionId={subRegionId}
                />
            } />
    );
}
