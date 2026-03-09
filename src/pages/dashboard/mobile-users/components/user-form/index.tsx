import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserSchema } from "./user.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/FormField";
import { userFields } from "./user.elemets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSingleUser } from "@/hooks/users/useSingleUser";
import { useUpsertUser } from "@/hooks/users/useUpsertUser";
import { mobileUserRoles } from "@/constants/userRoles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function UserForm({ id }: { id?: string }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { clientId } = useSelector((state: any) => state.auth);

    // get user data if id is provided
    const { user } = useSingleUser(id);


    // create area mutation
    const { mutate: saveUser, isPending } = useUpsertUser({ id });

    const form = useForm({
        resolver: zodResolver(getUserSchema(id)),
        defaultValues: {
            clientId,
            profilePhotoUrl: "https://example.com/profile.jpg",
        },
        mode: "all"
    });

    useEffect(() => {
        if (user) {
            form.reset({
                ...form.watch(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                nationalId: user.nationalId,
                employeeCode: user.employeeCode,
                dealerId: user.dealerId
            });
        }
    }, [user, form]);

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
            <form
                id="user-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full space-y-6"
            >
                <div className="flex w-full gap-4">
                    <div className="w-full grid grid-cols-12 gap-4">
                        {userFields(mobileUserRoles).map((field: any) => (
                            <FormField
                                key={field.name}
                                form={form}
                                {...field}
                            />
                        ))}
                    </div>
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
