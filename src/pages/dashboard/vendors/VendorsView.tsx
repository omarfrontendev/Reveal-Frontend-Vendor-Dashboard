import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import VendorsTable from './components/vendors-table';

export default function VendorsView() {
  const { total, loading } = useSelector((state: any) => state.vendors);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={t("vendors.title")}
        subtitle={t("vendors.activeVendors", { count: total })}
        loading={loading}
      >
        <Button onClick={() => navigate('/vendors/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("vendors.create")}
        </Button>
      </PageHeader>

      {/* Table */}
      <VendorsTable />
    </div>
  );
}
