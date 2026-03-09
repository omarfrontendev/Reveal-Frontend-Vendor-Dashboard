import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/layout/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersTable from './components/users-table';
import { useTranslation } from 'react-i18next';

export default function ViewMobileUsers() {
  const { total, loading } = useSelector((state: any) => state.users);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={t("users.mobile.title")}
        subtitle={t("users.activeUsers", { count: total })}
        loading={loading}
      >
        <Button onClick={() => navigate('/mobile-users/create')} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Plus className="w-4 h-4" />
          {t("users.mobile.create")}
        </Button>
      </PageHeader>

      {/* Table */}
      <UsersTable />
    </div>
  );
}
