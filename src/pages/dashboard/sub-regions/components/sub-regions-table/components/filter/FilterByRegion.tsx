import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAreas } from "@/hooks/area/useAreas";
import { FunnelPlus, Loader2Icon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FilterTemplate from "@/components/common/FilterTemplate";
import { useRegions } from "@/hooks/regions/useRegions";

/**
 * Component Props
 */
interface FilterByRegionProps {
    onFilterByRegion: (regionId: number | null) => void;
    regionId?: number | null;
}

export default function FilterByRegion({
    onFilterByRegion,
    regionId = null,
}: FilterByRegionProps) {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const [currentStep, setCurrentStep] = useState(1);


    /**
     * Selected area & region state
     */
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<number | null>(regionId);

    /**
     * Search input state
     */
    const [searchAreaTerm, setSearchAreaTerm] = useState<string>("");
    const [searchRegionTerm, setSearchRegionTerm] = useState<string>("");

    /**
     * Loading state from API
     */
    const { isLoading, areas } = useAreas();
    const { isLoading: regionsLoading, regions } = useRegions(selectedArea);

    /**
     * Reset state when dialog closes
     */
    const handleDialogChange = (open: boolean): void => {
        if (!open) {
            setSearchAreaTerm("");
            setSearchRegionTerm("");
            setSelectedRegion(regionId);
            setCurrentStep(1);
        }
    };

    /**
     * Get selected area label based on current language
     */
    const selectedRegionLabel = useMemo(() => {
        if (!selectedRegion) return null;

        const region = regions.find((item) => item.id === selectedRegion);
        if (!region) return null;

        return language === "ar" ? region?.nameAr : region?.nameEn;
    }, [selectedRegion, language, regions]);

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
                        {selectedRegionLabel ?? t("fields.region")}
                    </span>

                    {selectedRegion && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArea(null)
                                setSelectedRegion(null)
                                onFilterByRegion(null);
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
                {currentStep === 1 && (
                    <FilterTemplate
                        onSubmitting={regionsLoading}
                        nextBtn={true}
                        onBack={() => { }}
                        onSubmit={() => setCurrentStep(2)}
                        selectedItem={selectedArea}
                        setSelectedItem={setSelectedArea}
                        searchTerm={searchAreaTerm}
                        setSearchTerm={setSearchAreaTerm}
                        list={areas}
                        placeholder="common.searchAreaPlaceholder"
                        title="common.selectAreaTitle"
                        description="common.selectAreaDescription"
                    />
                )}
                {currentStep === 2 && (
                    <FilterTemplate
                        backBtn={true}
                        onBack={() => setCurrentStep(1)}
                        onSubmit={onFilterByRegion}
                        selectedItem={selectedRegion}
                        setSelectedItem={setSelectedRegion}
                        searchTerm={searchRegionTerm}
                        setSearchTerm={setSearchRegionTerm}
                        list={regions}
                        placeholder="common.searchRegionPlaceholder"
                        title="common.selectRegionTitle"
                        description="common.selectRegionDescription"
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}