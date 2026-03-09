import { UserActionsCell } from "./UserActionCell";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const useUsersColumns = (setRefreshData: any, setStatusDialog: any) => {

  const { t } = useTranslation();

  return [
    {
      id: 'firstName',
      header: () => t("fields.firstName.label"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px truncate block">
            {row.original.firstName}
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
      id: 'lastName',
      header: () => t("fields.lastName.label"),
      cell: ({ row }: any) => <div className="truncate block">{row.original.lastName}</div>,
      enableSorting: false,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'email',
      header: () => t("fields.email.label"),
      cell: ({ row }: any) => (
        <a
          href={`mailto:${row.original.email}`}
          className="truncate block"
          title={row.original.email}
        >{row.original.email}</a>
      ),
      enableSorting: false,
      minSize: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'role',
      header: () => t("fields.role.label"),
      cell: ({ row }: any) => (
        <div>{t(`roles.${row.original.role}`)}</div>
      ),
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

        const isActive = row.original.isActive;

        return (
          <div className="flex justify-center">
            {/* <Badge
              variant={isActive ? "activate" : "deactivate"}
              asChild
            >
              <Button
                onClick={() => setStatusDialog(row.original)}
                className="cursor-pointer p-4">
                {isActive ? t("buttons.activated") : t("buttons.deactivated")}
              </Button>
            </Badge> */}
            <Button
              variant={isActive ? "activate" : "deactivate"}
              onClick={() => setStatusDialog(row.original)}
              className="cursor-pointer p-4">
              {isActive ? t("buttons.activated") : t("buttons.deactivated")}
            </Button>
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
          setRefreshData={setRefreshData}
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
