import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SubRegionsTable from './components/sub-regions-table';
import { useTranslation } from 'react-i18next';

export default function SubRegionsView() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { total, loading } = useSelector((state: any) => state.subRegions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        loading={loading}
        title={t("subregions.title")}
        subtitle={t("subregions.activeSubregions", { count: total })}>
        <Button onClick={() => navigate('/sub-regions/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("subregions.create")}
        </Button>
      </PageHeader>
      <SubRegionsTable />
    </div>
  );
}
