import { useTranslation } from "react-i18next";
import { MallsActionsCell } from "./MallActionCell";

export const useMallsColumns = (setRefreshData: any) => {

  const { t, i18n: { language } } = useTranslation();

  return [
    {
      id: 'nameEn',
      header: () => <p>{t("fields.name.label")}</p>,
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
            {row.original?.[language === "ar" ? "nameAr" : "nameEn"]}
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
