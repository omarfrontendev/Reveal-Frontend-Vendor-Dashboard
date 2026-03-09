import { Card } from "@/components/ui/card";
import TableSearch from "@/components/ui/table-search";
import { useTranslation } from "react-i18next";
import FilterBySubRegion from "./FilterBySubRegion";

export default function MallsFilters({ placeholder, onSearch, onClearSearch, onFilterBySubRegion, subRegionId }) {

    const { t } = useTranslation();

    return (
        <Card className="p-2">
            <div className="flex items-center gap-2">
                <div className="relative flex w-full gap-3 items-center">
                    <div className="w-1/3">
                        <TableSearch
                            placeholder={t(placeholder)}
                            onSearch={onSearch}
                            onClearSearch={onClearSearch}
                        />
                    </div>
                    <FilterBySubRegion onFilterBySubRegion={onFilterBySubRegion} subRegionId={subRegionId} />
                </div>
            </div>
        </Card>
    )
}