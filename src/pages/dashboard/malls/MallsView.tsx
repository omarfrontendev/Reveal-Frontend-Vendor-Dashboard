import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MallTable from './components/mall-table';
import { useTranslation } from 'react-i18next';

export default function MallsView() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // get sub-regions for select 
  const { total, loading } = useSelector((state: any) => state.malls);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader loading={loading} title={t("malls.title")} subtitle={t("malls.activeMalls", { count: total })}>
        <Button onClick={() => navigate('/malls/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("malls.create")}
        </Button>
      </PageHeader>
      <MallTable />
    </div>
  );
}
