import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteShfit } from "@/hooks/shift/useDeleteShift";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ShiftActionsCell = ({ row, setRefreshData }: any) => {
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const { mutateAsync, isPending } = useDeleteShfit();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="size-7" variant="ghost">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        onClick={() => navigate(`/shifts/${row.original.id}/edit`)}
                    >
                        {t("buttons.edit")}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        variant="destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteOpen(true);
                        }}
                    >
                        {t("buttons.delete")}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={t("shifts.deleteTitle")}
                description={`${t("shifts.deleteDescription")} "${row.original?.name}"?`}
                loading={isPending}
                onConfirm={async () => {
                    await mutateAsync(row.original.id);
                    setDeleteOpen(false);
                    setRefreshData();
                }}
            />
        </>
    );
};
