import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchShifts } from '@/app/store/features/shifts/shiftsThunk';
import ShiftsTable from './components/shifts-table';
import { useTranslation } from 'react-i18next';

export default function ShiftsView() {
  const { t } = useTranslation();
  const [refreshData, setRefreshData] = useState(false);
  const { total, loading } = useSelector((state: any) => state.shifts);
  const [tableOptions, setTableOptions] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch && dispatch(fetchShifts({
      page: tableOptions.pageIndex + 1,
      limit: tableOptions.pageSize,
    } as any));
  }, [dispatch, tableOptions.pageIndex, tableOptions.pageSize, refreshData]);


  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader loading={loading} title={t("shifts.title")} subtitle={t("shifts.activeShifts", { count: total })}>
        <Button onClick={() => navigate('/shifts/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("shifts.create")}
        </Button>
      </PageHeader>
      <ShiftsTable tableOptions={tableOptions} setTableOptions={setTableOptions} setRefreshData={() => setRefreshData((prev: any) => !prev)} />
    </div>
  );
}
