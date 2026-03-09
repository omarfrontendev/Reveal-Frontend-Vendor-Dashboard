import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AreaTable from './components/area-table';
import { useTranslation } from 'react-i18next';

export default function AreasView() {
  const { total, loading } = useSelector((state: any) => state.area);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={t("areas.title")}
        subtitle={t("areas.activeAreas", { count: total })}
        loading={loading}
      >
        <Button
          onClick={() => navigate('/areas/create')}
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        >
          <Plus className="w-4 h-4" />
          {t("areas.create")}
        </Button>
      </PageHeader>
      <AreaTable />
    </div>
  );
}
