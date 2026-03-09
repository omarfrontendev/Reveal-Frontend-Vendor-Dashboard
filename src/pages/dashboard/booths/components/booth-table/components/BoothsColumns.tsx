import { useTranslation } from "react-i18next";
import { MallsActionsCell } from "./BoothActionCell";

export const useBoothsColumns = (setRefreshData: any) => {

  const { t } = useTranslation();

  return [
    {
      id: 'nameEn',
      header: () => t("fields.name.label"),
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
            {row.original.name}
          </div>
        </div>
      ),
      enableSorting: false,
      size: 300,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'code',
      header: () => t("fields.code.label"),
      cell: ({ row }: any) => (
        <div>{row.original.code}</div>
      ),
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'mall',
      header: () => t("malls.mallAdress"),
      cell: ({ row }: any) => (
        <div>{row?.original?.mall?.address}</div>
      ),
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
        <MallsActionsCell
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
