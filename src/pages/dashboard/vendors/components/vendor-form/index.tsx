import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getVendorSchema } from "./vendor.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { vendorFields } from "./vendor.elemets";
import { useUpsertVendor } from "@/hooks/vendors/useUpsertVendor";

export default function VendorForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { clientId } = useSelector((state: any) => state.auth);

    // create vendor mutation
    const { mutate: saveVendor, isPending } = useUpsertVendor({ id });

    const form = useForm({
        resolver: zodResolver(getVendorSchema()),
        defaultValues: {
            clientId,
            vendorSuperAdminId: clientId,
        },
        mode: "all"
    });

    const onSubmit = (data: any) => {
        saveVendor(data, {
            onSuccess: () => {
                form.reset();
                navigate("/vendors");
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="user-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="w-full grid grid-cols-12 gap-4">
                    {vendorFields().map((field) => (
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
