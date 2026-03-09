import { Card } from "@/components/ui/card";
import TableSearch from "@/components/ui/table-search";
import { useTranslation } from "react-i18next";
import FilterByRegion from "./FilterByRegion";

export default function SubRegionsFilters({ placeholder, onSearch, onClearSearch, onFilterByRegion, regionId }) {

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
                    <FilterByRegion onFilterByRegion={onFilterByRegion} regionId={regionId} />
                </div>
            </div>
        </Card>
    )
}