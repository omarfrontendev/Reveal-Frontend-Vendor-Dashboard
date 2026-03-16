import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegionsTable from './components/regions-table';
import { useTranslation } from 'react-i18next';

export default function ViewRegions() {
  const { total, loading } = useSelector((state: any) => state.regions);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader loading={loading} title={t("regions.title")} subtitle={t("regions.activeRegions", { count: total })}>
        <Button onClick={() => navigate('/regions/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("regions.create")}
        </Button>
      </PageHeader>
      
      <RegionsTable />
    </div>
  );
}
