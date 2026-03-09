import { Card } from "@/components/ui/card";
import TableSearch from "@/components/ui/table-search";
import { useTranslation } from "react-i18next";
import FilterByAreas from "./FilterByAreas";

export default function RegionsFilters({ placeholder, onSearch, onClearSearch, onFilterByAreas, areaId }) {

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
                    <FilterByAreas onFilterByAreas={onFilterByAreas} areaId={areaId} />
                </div>
            </div>
        </Card>
    )
}