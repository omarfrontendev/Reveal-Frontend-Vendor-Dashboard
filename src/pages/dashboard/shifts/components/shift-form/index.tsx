import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { useNavigate } from "react-router-dom";
import { useUpsertShift } from "@/hooks/shift/useUpsertShift";
import { weekDays } from "@/constants/weekDays";
import { useSelector } from "react-redux";
import { useSingleShift } from "@/hooks/shift/useSingleShift";
import { useEffect } from "react";
import { shiftFields } from "./shift.elemets";
import { getShiftSchema } from "./shift.schema";
import { useTranslation } from "react-i18next";

export default function ShiftForm({ id }: { id?: string }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { vendorId } = useSelector((state: any) => state.auth);

    // get shift data if id is provided
    const { shift } = useSingleShift(id);

    // create area mutation
    const { mutate: saveShift, isPending } = useUpsertShift({ id });

    const form = useForm({
        resolver: zodResolver(getShiftSchema(id)),
        defaultValues: {
            vendorId: vendorId,
        },
        mode: "all"
    });

    useEffect(() => {
        if (shift) {
            const startTime = shift.startTime.split(":").slice(0, 2).join(":");
            const endTime = shift.endTime.split(":").slice(0, 2).join(":");
            form.reset({
                name: shift.name,
                day: shift.day,
                startTime,
                endTime
            });
        }
    }, [shift, form]);

    const onSubmit = (data: any) => {
        saveShift(data, {
            onSuccess: () => {
                form.reset();
                navigate("/shifts");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="shift-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="w-full grid grid-cols-12 gap-4">
                    {shiftFields(id, weekDays).map((field) => (
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
