import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAreaSchema } from "./area.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { areaFields } from "./area.elemets";
import type { AreaBody } from "@/types/area";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSingleArea } from "@/hooks/area/useSingleArea";
import { useUpsertArea } from "@/hooks/area/useUpsertArea";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AreaForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const { vendorId } = useSelector((state: any) => state.auth);
    // get area data if id is provided
    const { area } = useSingleArea(id);

    // create area mutation
    const { mutate: saveArea, isPending } = useUpsertArea({ id });

    const form = useForm({
        resolver: zodResolver(getAreaSchema()),
        defaultValues: {
            vendorId,
            coords: []
        },
        mode: "all"
    });

    useEffect(() => {
        if (area) {
            form.reset({
                nameEn: area.nameEn,
                nameAr: area.nameAr,
                areaCode: area.areaCode,
                coords: area.coords
            });
        }
    }, [area, form]);

    const onSubmit = (data: AreaBody) => {
        saveArea(data, {
            onSuccess: () => {
                form.reset();
                navigate("/areas");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="area-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="w-full grid grid-cols-12 gap-4">
                    {areaFields().map((field) => (
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
