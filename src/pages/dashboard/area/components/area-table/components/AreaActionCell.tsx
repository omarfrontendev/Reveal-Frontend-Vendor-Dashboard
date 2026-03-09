import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteArea } from "@/hooks/area/useDeleteArea";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PolygonDialog from "./PolygonDialog";

export const AreaActionsCell = ({ row, setRefreshData }: any) => {
    const [polygonOpen, setPolygonOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const { mutateAsync, isPending } = useDeleteArea();
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
                        onClick={e => {
                            e.stopPropagation();
                            setPolygonOpen(true);
                        }}
                    >
                        {t("buttons.polygon")}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => navigate(`/areas/${row.original.id}/edit`)}
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

            <PolygonDialog
                open={polygonOpen}
                setOpen={(open: boolean) => { if (!open) setPolygonOpen(false); }}
                coords={row.original?.coords ?? []}
            />

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={t("areas.deleteTitle")}
                description={`${t("dialog.deleteDescription")} "${row.original?.nameEn}"?`}
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
