import { useTranslation } from "react-i18next";
import { RegionsActionsCell } from "./SubRegionsActionCell";

export const useSubRegionsColumns = (setRefreshData: any) => {

  const { t } = useTranslation();

  return [
    {
      id: 'nameEn',
      header: () => <p>{t("fields.name.label")}</p>,
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
            {row.original.nameEn}
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
      header: () => <p>{t("fields.code.label")}</p>,
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
      id: 'actions',
      cell: ({ row }: any) => (
        <RegionsActionsCell
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
