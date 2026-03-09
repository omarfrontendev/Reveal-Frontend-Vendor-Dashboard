import { useState } from 'react';
import SelectMenu from '@/components/ui/SelectMenu';
import { useRegions } from '@/hooks/regions/useRegions';
import { useAreas } from '@/hooks/area/useAreas';
import { useTranslation } from 'react-i18next';

export default function SubRegionsFilter({ setRegionId, regionId }: { setRegionId: (value: number) => void, regionId: number }) {

    const { t, i18n: { language } } = useTranslation();

    // get areas for select 
    const [areaId, setAreaId] = useState(null);
    const { areas, isLoading: areaLoading } = useAreas();
    const areasOptions = (areas || []).map((area: any) => ({ label: area?.[language === "ar" ? "nameAr" : "nameEn"], value: area.id }));


    // get regions for select 
    const { regions, isLoading: regionsLoading } = useRegions(areaId);
    const regionsOptions = (regions || []).map((region: any) => ({ label: region?.[language === "ar" ? "nameAr" : "nameEn"], value: region.id }));

    return (
        <>
            <div className='w-60'>
                <SelectMenu
                    options={areasOptions}
                    placeholder={t("regions.selectArea")}
                    value={areasOptions.filter((item: any) => areaId === item.value)}
                    onChange={(e: any) => setAreaId(e)}
                    onBlur={() => { }}
                    isLoading={areaLoading}
                />
            </div>
            <div className='w-60'>
                <SelectMenu
                    options={regionsOptions}
                    placeholder={t("subregions.selectRegion")}
                    value={regionsOptions.filter((item: any) => regionId === item.value)}
                    onChange={(e: any) => setRegionId(e)}
                    onBlur={() => { }}
                    isLoading={regionsLoading}
                />
            </div>
        </>
    );
}
