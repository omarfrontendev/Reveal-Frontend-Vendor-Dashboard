import { useTranslation } from "react-i18next";
import { ShiftActionsCell } from "./ShiftActionCell";

export const useShiftsColumns = (setRefreshData: any) => {

  const { t } = useTranslation();

  return [
    {
      id: 'name',
      header: () => <p>{t("fields.name.label")}</p>,
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
            {row.original.name || "--"}
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
      id: 'day',
      header: () => <p>{t("fields.day.label")}</p>,
      cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
            {row.original.day}
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
      id: 'startTime',
      header: () => <p>{t("fields.startTime.label")}</p>,
      cell: ({ row }: any) => (
        <div>{row.original.startTime}</div>
      ),
      enableSorting: false,
      size: 200,
      meta: {
        headerClassName: '',
        skeleton: <div className="h-5 w-full bg-muted rounded" />,
      },
    },
    {
      id: 'endTime',
      header: () => <p>{t("fields.endTime.label")}</p>,
      cell: ({ row }: any) => (
        <div>{row.original.endTime}</div>
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
        <ShiftActionsCell
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
