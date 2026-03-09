import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBoothSchema } from "./booth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { bootheFields } from "./booth.elemets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSinglesBooth } from "@/hooks/booths/useSingleBooth";
import { useAllMalls } from "@/hooks/malls/useMalls";
import { useUpsertBooth } from "@/hooks/booths/useUpsertBooths";
import type { CreateBoothDto } from "@/types/booths";
import { useShifts } from "@/hooks/shift/useShifts";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function BoothForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { clientId } = useSelector((state: any) => state.auth);
    const { t } = useTranslation();
    // get sub-region data if id is provided
    const { booth } = useSinglesBooth(id);

    // get malls 
    const { malls, isLoading: mallsLoading } = useAllMalls();
    const mallsOptions = malls.map((area: any) => ({ label: area.nameEn, value: area.id }));

    // get shifts 
    const { shifts, isLoading: shiftsLoading } = useShifts();
    const shiftsOptions = shifts.map(shift => ({ label: `${shift?.name}`, value: shift.id }));


    // create area mutation
    const { mutate: saveBooth, isPending } = useUpsertBooth({ id });
    const form = useForm({
        resolver: zodResolver(getBoothSchema()),
        defaultValues: {
            clientId,
        },
        mode: "all"
    });


    useEffect(() => {
        if (booth) {
            const shiftIds = booth?.shifts?.map((shift: any) => shift?.id);
            form.reset({
                name: booth.name,
                mallId: booth.mallId,
                clientId: booth.clientId,
                code: booth.code,
                cameraConfig: {
                rtspUrl: booth?.cameraConfig.rtspUrl,
                username: booth?.cameraConfig.username,
                password: booth?.cameraConfig.password,
                },
                shiftIds
            });
        }
    }, [booth, form]);

    const onSubmit = (data: CreateBoothDto) => {
        saveBooth(data, {
            onSuccess: () => {
                form.reset();
                navigate("/booths");
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
                    {bootheFields(mallsOptions, mallsLoading, shiftsOptions, shiftsLoading).map((field) => (
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
