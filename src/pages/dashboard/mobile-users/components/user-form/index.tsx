import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { salesAgentRequiredFields, supervisorRequiredFields, userFields } from "./user.elemets";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useUpsertUser } from "@/hooks/users/useUpsertUser";
import { mobileUserRoles } from "@/constants/userRoles";
import { useTranslation } from "react-i18next";
import { useUserForm } from "./hooks/useUserForm";

export default function UserForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        form,
        role,
        boothsOptions,
        isBoothsLoading,
        shiftsOptions,
        isShiftsLoading,
        areasOptions,
        isAreasLoading,
        regionsOptions,
        isRegionsLoading,
        subRegionsOptions,
        isSubRegionsLoading
    } = useUserForm(id);

    const { mutate: saveUser, isPending } = useUpsertUser({ id });

    const fields = useMemo(() => {
        const allFields = userFields(mobileUserRoles);

        if (role === "VendorMobileSales") {
            return allFields.concat(
                salesAgentRequiredFields(boothsOptions, isBoothsLoading, shiftsOptions, isShiftsLoading)
            );
        }

        if (role === "VendorMobileSupervisor") {
            return allFields.concat(
                supervisorRequiredFields(areasOptions, isAreasLoading, regionsOptions, isRegionsLoading, subRegionsOptions, isSubRegionsLoading)
            );
        }

        return allFields;
    }, [role, boothsOptions, shiftsOptions, areasOptions, regionsOptions, subRegionsOptions]);


    const onSubmit = (data: any) => {
        saveUser(data, {
            onSuccess: () => {
                form.reset();
                navigate("/mobile-users");
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex w-full gap-4">
                    <div className="w-full grid grid-cols-12 gap-4">
                        {fields.map((field: any) => (
                            <FormField
                                key={field.name}
                                form={form}
                                {...field}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    className="w-full h-12 mt-6"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? t("buttons.saving") : t("buttons.save")}
                </Button>
            </form>
        </Form>
    );
}
