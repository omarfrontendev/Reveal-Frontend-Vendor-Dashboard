import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSubRegionSchema } from "./sub-region.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { subRegionFields } from "./sub-region.elemets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSinglesSubRegion } from "@/hooks/sub-regions/useSingleSubRegion";
import { useAllRegions} from "@/hooks/regions/useRegions";
import { useUpsertSubRegion } from "@/hooks/sub-regions/useUpsertSubRegion";
import type { SubRegionBody } from "@/types/sub-regions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function SubRegionForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedCoords, setSelectedCoords] = useState<any[]>([]);

    const { vendorId } = useSelector((state: any) => state.auth);

    // get sub-region data if id is provided
    const { subRegion } = useSinglesSubRegion(id);

    // get regions 
    const { regions, isLoading: regionsLoading } = useAllRegions();
    const regionsOptions = regions.map((area: any) => ({ label: area.nameEn, value: area.id }));

    // create area mutation
    const { mutate: saveSubRegion, isPending } = useUpsertSubRegion({ id });
    const form = useForm({
        resolver: zodResolver(getSubRegionSchema()),
        defaultValues: {
            vendorId,
            coords: []
        },
        mode: "all"
    });

    const regionId = form.watch("regionId");

    useEffect(() => {
        !id && form.setValue("coords", []);
    }, [regionId, id]);

    useEffect(() => {
        const regionId = form.watch("regionId");
        if (regionId) {
            const region = regions.find((r) => r.id === regionId) as any;
            if (region && region.coords) {
                const regionCoords = region.coords.map((coord: any) => ({ lat: coord.lat, lng: coord.lng }));
                setSelectedCoords(regionCoords);
            }
        }
    }, [form.watch("regionId")]);

    useEffect(() => {
        if (subRegion) {
            form.reset({
                nameEn: subRegion.nameEn,
                nameAr: subRegion.nameAr,
                regionId: subRegion.regionId,
                code: subRegion.code,
                coords: subRegion.coords,
            });
        }
    }, [subRegion, form]);

    const onSubmit = (data: SubRegionBody) => {
        saveSubRegion(data, {
            onSuccess: () => {
                form.reset();
                navigate("/sub-regions");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="subregion-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="w-full grid grid-cols-12 gap-4">
                    {subRegionFields(regionsOptions, regionsLoading, selectedCoords, id).map((field) => (
                        <FormField
                            key={field.name}
                            form={form}
                            {...field}
                        />
                    ))}
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                    {isPending ? t("buttons.saving") : t("buttons.save")}
                </Button>
            </form>
        </Form>
    );
}
