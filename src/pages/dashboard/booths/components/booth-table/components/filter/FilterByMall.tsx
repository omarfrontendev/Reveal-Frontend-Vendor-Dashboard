import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAreas } from "@/hooks/area/useAreas";
import { FunnelPlus, Loader2Icon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FilterTemplate from "@/components/common/FilterTemplate";
import { useRegions } from "@/hooks/regions/useRegions";
import { useSubRegions } from "@/hooks/sub-regions/useSubRegions";
import { useMalls } from "@/hooks/malls/useMalls";

/**
 * Component Props
 */
interface FilterBySubRegionProps {
    onFilterByMall: (mallId : number | null) => void;
    mallId ?: number | null;
}

export default function FilterByMall({
    onFilterByMall,
    mallId = null,
}: FilterBySubRegionProps) {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    const [currentStep, setCurrentStep] = useState(1);


    /**
     * Selected area & region state
     */
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
    const [selectedSubRegion, setSelectedSubRegion] = useState<number | null>(null);
    const [selectedMall, setSelectedMall] = useState<number | null>(mallId);

    /**
     * Search input state
     */
    const [searchAreaTerm, setSearchAreaTerm] = useState<string>("");
    const [searchRegionTerm, setSearchRegionTerm] = useState<string>("");
    const [searchSubRegionTerm, setSearchSubRegionTerm] = useState<string>("");
    const [searchMallTerm, setSearchMallTerm] = useState<string>("");

    /**
     * Loading state & data from API
     */
    const { isLoading, areas } = useAreas();
    const { isLoading: regionsLoading, regions } = useRegions(selectedArea);
    const { isLoading: subRegionsLoading, subRegions } = useSubRegions(selectedSubRegion);
    const { isLoading: mallsLoading, malls } = useMalls(selectedSubRegion);


    /**
     * Reset state when dialog closes
     */
    const handleDialogChange = (open: boolean): void => {
        if (!open) {
            setSearchAreaTerm("");
            setSearchRegionTerm("");
            setSearchSubRegionTerm("");
            setSearchMallTerm("");
            setSelectedMall(mallId);
            setCurrentStep(1);
        }
    };

    /**
     * Get selected area label based on current language
     */
    const selectedMallLabel = useMemo(() => {
        if (!selectedMall) return null;

        const mall = malls.find((item) => item.id === selectedMall);
        if (!malls) return null;

        return language === "ar" ? mall?.nameAr : mall?.nameEn;
    }, [selectedMall, language, malls]);

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
                        {selectedMallLabel ?? t("fields.mall")}
                    </span>

                    {selectedArea && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArea(null)
                                setSelectedRegion(null)
                                setSelectedSubRegion(null)
                                setSelectedMall(null)
                                onFilterByMall(null);
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
                        onSubmitting={subRegionsLoading}
                        backBtn={true}
                        nextBtn={true}
                        onBack={() => setCurrentStep(1)}
                        onSubmit={() => setCurrentStep(3)}
                        selectedItem={selectedSubRegion}
                        setSelectedItem={setSelectedSubRegion}
                        searchTerm={searchSubRegionTerm}
                        setSearchTerm={setSearchSubRegionTerm}
                        list={regions}
                        placeholder="common.searchRegionPlaceholder"
                        title="common.selectRegionTitle"
                        description="common.selectRegionDescription"
                    />
                )}
                {currentStep === 3 && (
                    <FilterTemplate
                        backBtn={true}
                        nextBtn={true}
                        onBack={() => setCurrentStep(2)}
                        onSubmit={() => setCurrentStep(4)}
                        onSubmitting={mallsLoading}
                        selectedItem={selectedRegion}
                        setSelectedItem={setSelectedRegion}
                        searchTerm={searchRegionTerm}
                        setSearchTerm={setSearchRegionTerm}
                        list={subRegions}
                        placeholder="common.searchSubRegionPlaceholder"
                        title="common.selectSubRegionTitle"
                        description="common.selectSubRegionDescription"
                    />
                )}
                {currentStep === 4 && (
                    <FilterTemplate
                        backBtn={true}
                        onBack={() => setCurrentStep(3)}
                        onSubmit={onFilterByMall}
                        selectedItem={selectedMall}
                        setSelectedItem={setSelectedMall}
                        searchTerm={searchMallTerm}
                        setSearchTerm={setSearchMallTerm}
                        list={malls}
                        placeholder="common.searchMallPlaceholder"
                        title="common.selectMallTitle"
                        description="common.selectMallDescription"
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}