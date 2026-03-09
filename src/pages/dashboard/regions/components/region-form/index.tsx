import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegionSchema } from "./region.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { regionFields } from "./region.elemets";
import { useNavigate } from "react-router-dom";
import { useSingleRegion } from "@/hooks/regions/useSingleRegion";
import { useUpsertRegion } from "@/hooks/regions/useUpsertRegion";
import type { RegionBody } from "@/types/regions";
import { useAreas } from "@/hooks/area/useAreas";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function RegionForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const [selectedCoords, setSelectedCoords] = useState<any[]>([]);
    const { clientId } = useSelector((state: any) => state.auth);
    const { t } = useTranslation();

    // get area data if id is provided
    const { region } = useSingleRegion(id);

    // get areas 
    const { areas, isLoading: areaLoading } = useAreas();
    const areasOptions = areas.map((area: any) => ({ label: area.nameEn, value: area.id }));

    // create area mutation
    const { mutate: saveRegion, isPending } = useUpsertRegion({ id });
    const form = useForm({
        resolver: zodResolver(getRegionSchema()),
        defaultValues: {
            clientId,
            coords: []
        },
        mode: "all"
    });

    useEffect(() => {
        const areaId = form.watch("areaId");
        if (areaId) {
            const area = areas.find((a) => a.id === areaId) as any;
            if (area && area.coords) {
                const areaCoords = area.coords.map((coord: any) => ({ lat: coord.lat, lng: coord.lng }));
                setSelectedCoords(areaCoords);
            }
        }
    }, [form.watch("areaId")]);

    const areaId = form.watch("areaId");

    useEffect(() => {
        !id && form.setValue("coords", []);
    }, [areaId, id]);

    useEffect(() => {
        if (region) {
            form.reset({
                nameEn: region.nameEn,
                nameAr: region.nameAr,
                areaId: region.areaId,
                regionCode: region.regionCode,
                coords: region.coords,
                // clientSuperAdminUserId: region.clientId
            });
        }
    }, [region, form]);

    const onSubmit = (data: RegionBody) => {
        saveRegion(data, {
            onSuccess: () => {
                form.reset();
                navigate("/regions");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="region-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="w-full grid grid-cols-12 gap-4">
                    {regionFields(areasOptions, areaLoading, selectedCoords, id).map((field) => (
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
