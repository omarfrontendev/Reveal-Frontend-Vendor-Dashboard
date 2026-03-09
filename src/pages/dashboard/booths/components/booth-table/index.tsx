import MainTable from "@/components/common/MainTable";
import { useBoothsTableLogic } from "@/pages/dashboard/booths/components/booth-table/hooks/useBoothsTableLogic";
import React, { useCallback } from "react";
import BoothsFilters from "./components/filter/Filters";

const MemoizedFilters = React.memo(BoothsFilters);

export default function BoothsTable() {

    const {
        loading,
        totalCount,
        table,
        errorMsg,
        mallId,
        onFilterByMall,
        onSearch,
        onClearSearch
    } = useBoothsTableLogic();

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
                    placeholder="booths.searchPlaceholder"
                    onFilterByMall={onFilterByMall}
                    mallId={mallId}
                />
            } />
    );
}
