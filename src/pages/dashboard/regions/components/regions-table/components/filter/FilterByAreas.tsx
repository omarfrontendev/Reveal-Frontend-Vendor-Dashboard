import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAreas } from "@/hooks/area/useAreas";
import { FunnelPlus, Loader2Icon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FilterTemplate from "@/components/common/FilterTemplate";

/**
 * Component Props
 */
interface FilterByAreasProps {
    onFilterByAreas: (areaId: number | null) => void;
    areaId?: number | null;
}

export default function FilterByAreas({
    onFilterByAreas,
    areaId = null,
}: FilterByAreasProps) {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    /**
     * Selected area state
     */
    const [selectedArea, setSelectedArea] = useState<number | null>(areaId);

    /**
     * Search input state
     */
    const [searchTerm, setSearchTerm] = useState<string>("");

    /**
     * Loading state & Areas from API
     */
    const { isLoading, areas } = useAreas();

    /**
     * Reset state when dialog closes
     */
    const handleDialogChange = (open: boolean): void => {
        if (!open) {
            setSearchTerm("");
            setSelectedArea(areaId);
        }
    };

    /**
     * Get selected area label based on current language
     */
    const selectedAreaLabel = useMemo(() => {
        if (!selectedArea) return null;

        const area = areas.find(item => item.id === selectedArea);
        if (!area) return null;

        return language === "ar" ? area?.nameAr : area?.nameEn;
    }, [selectedArea, language, areas]);

    return (
        <Dialog onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2Icon className="animate-spin" />
                    ) : (
                        <FunnelPlus />
                    )}

                    <span className="truncate max-w-[120px]">
                        {selectedAreaLabel ?? t("fields.area")}
                    </span>

                    {selectedArea && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArea(null)
                                onFilterByAreas(null);
                            }}
                            className="ml-1 flex h-5 w-5 items-center justify-center 
                                        rounded-full transition-colors
                                        hover:bg-muted hover:text-destructive
                                        cursor-pointer"
                        >
                            <X size={14} />
                        </span>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="w-1/3">
                <FilterTemplate
                    onBack={() => { }}
                    onSubmit={onFilterByAreas}
                    selectedItem={selectedArea}
                    setSelectedItem={setSelectedArea}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    list={areas}
                    placeholder="common.searchAreaPlaceholder"
                    title="common.selectAreaTitle"
                    description="common.selectAreaDescription"
                />
            </DialogContent>
        </Dialog>
    );
}