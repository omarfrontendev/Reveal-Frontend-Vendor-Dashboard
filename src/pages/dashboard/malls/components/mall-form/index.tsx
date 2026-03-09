import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMallSchema } from "./mall.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { mallFields } from "./mall.elemets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSinglesMall } from "@/hooks/malls/useSingleMall";
import { useAllSubRegions } from "@/hooks/sub-regions/useSubRegions";
import type { MallBody } from "@/types/malls";
import { useUpsertMall } from "@/hooks/malls/useUpsertMall";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function MallForm({ id }: { id?: string }) {

    const [selectedCoords, setSelectedCoords] = useState<any[]>([]);
    const { vendorId } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // get sub-region data if id is provided
    const { mall: subRegion } = useSinglesMall(id);

    // get sub-regions 
    const { subRegions, isLoading: subRegionsLoading } = useAllSubRegions();
    const subRegionsOptions = subRegions.map((area: any) => ({ label: area.nameEn, value: area.id }));

    // create area mutation
    const { mutate: saveMall, isPending } = useUpsertMall({ id });
    const form = useForm({
        resolver: zodResolver(getMallSchema()),
        defaultValues: {
            coords: [],
            vendorId
        },
        mode: "all"
    });

    const subRegionId = form.watch("subRegionId");

    useEffect(() => {
        !id && form.setValue("coords", []);
    }, [subRegionId, id]);

    useEffect(() => {
        const subRegionId = form.watch("subRegionId");
        if (subRegionId) {
            const subRegion = subRegions.find((r: any) => r.id === subRegionId) as any;
            if (subRegion && subRegion.coords) {
                const subRegionCoords = subRegion.coords.map((coord: any) => ({ lat: coord.lat, lng: coord.lng }));
                setSelectedCoords(subRegionCoords);
            }
        }
    }, [form.watch("subRegionId")]);

    useEffect(() => {
        if (subRegion) {
            form.reset({
                nameEn: subRegion.nameEn,
                nameAr: subRegion.nameAr,
                subRegionId: subRegion.subRegionId,
                code: subRegion.code,
                coords: subRegion.coords,
                address: subRegion.address,
            });
        }
    }, [subRegion, form]);

    const onSubmit = (data: MallBody) => {
        saveMall(data, {
            onSuccess: () => {
                form.reset();
                navigate("/malls");
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
                    {mallFields(subRegionsOptions, subRegionsLoading, selectedCoords, id).map((field) => (
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
