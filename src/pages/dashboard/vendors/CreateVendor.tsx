import { PageHeader } from '@/layout/components/PageHeader';
import { useTranslation } from 'react-i18next';
import VendorForm from './components/vendor-form';

export default function CreateVendor() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('vendors.create')} subtitle={t("vendors.createDescription")}>
            </PageHeader>
            <VendorForm />
        </div>
    );
}
