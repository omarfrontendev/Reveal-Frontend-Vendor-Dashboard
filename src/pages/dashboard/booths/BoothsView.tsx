import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BoothsTable from './components/booth-table';

export default function BoothsView() {
  const { t } = useTranslation();
  const { total, loading } = useSelector((state: any) => state.booths);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader loading={loading} title={t("booths.title")} subtitle={t("booths.activeBooths", { count: total })}>
        <Button onClick={() => navigate('/booths/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("booths.create")}
        </Button>
      </PageHeader>
      <BoothsTable />
    </div>
  );
}
