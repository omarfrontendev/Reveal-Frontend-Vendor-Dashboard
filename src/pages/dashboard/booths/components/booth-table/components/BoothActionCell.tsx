import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDeleteBooth } from "@/hooks/booths/useDeleteBooths";

export const MallsActionsCell = ({ row, setRefreshData }: any) => {
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const { mutateAsync, isPending } = useDeleteBooth();
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
                        onClick={() => navigate(`/booths/${row.original.id}/edit`)}
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
                title={t("booths.deleteTitle")}
                description={`${t("dialog.deleteDescription")} "${row.original?.name}"?`}
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
