import { Card } from "@/components/ui/card";
import TableSearch from "@/components/ui/table-search";
import { useTranslation } from "react-i18next";
import FilterByMall from "./FilterByMall";

export default function BoothsFilters({ placeholder, onSearch, onClearSearch, onFilterByMall, mallId }) {

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
                    <FilterByMall onFilterByMall={onFilterByMall} mallId={mallId} />
                </div>
            </div>
        </Card>
    )
}