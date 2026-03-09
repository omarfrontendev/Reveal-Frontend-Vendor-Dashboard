// import { Badge } from "@/components/ui/badge";
import { UserActionsCell } from "./UserActionCell";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const useUsersColumns = (setStatusDialog: any) => {

  const { t, i18n: { language } } = useTranslation();

  return [
    {
      id: 'name',
      header: () => t("fields.name.label"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original?.[language === "ar" ? "nameAr" : "nameEn"]}
          </div>
        </div>
      ),
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'boothsCount',
      header: () => t("fields.boothsCount"),
      cell: ({ row }: any) => <div className="truncate block">{row.original.boothsCount}</div>,
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'mobileUsersCount',
      header: () => t("fields.mobileUsersCount"),
      cell: ({ row }: any) => <div className="truncate block">{row.original.mobileUsersCount}</div>,
      enableSorting: false,
      minSize: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'dashboardUsersCount',
      header: () => t("fields.dashboardUsersCount"),
      cell: ({ row }: any) => <div className="truncate block">{row.original.dashboardUsersCount}</div>,
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'isActive',
      header: () => t("fields.status.label"),
      cell: ({ row }: any) => {

        const status = row.original.status;

        return (
          <div className="flex justify-center">
            {/* <Badge
              asChild
              > */}
            <Button
              variant={status ? "activate" : "deactivate"}
              onClick={() => setStatusDialog(row.original)}
              className="cursor-pointer p-4">
              {status ? t("buttons.activated") : t("buttons.deactivated")}
            </Button>
            {/* </Badge> */}
          </div>
        )
      },
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <UserActionsCell
          row={row}
        />
      ),
      enableSorting: false,
      size: 50,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
  ];
};
