import { Card } from "@/components/ui/card";
import TableSearch from "@/components/ui/table-search";
import { useTranslation } from "react-i18next";

export default function AreasFilters({ placeholder, onSearch, onClearSearch }) {

    const  { t } = useTranslation();

    return (
        <Card className="p-2">
            <div className="flex items-center gap-2">
                <div className="relative w-100">
                    <TableSearch
                        placeholder={t(placeholder)}
                        onSearch={onSearch}
                        onClearSearch={onClearSearch} />
                </div>
            </div>
        </Card>
    )
}