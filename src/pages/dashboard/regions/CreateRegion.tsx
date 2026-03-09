import { PageHeader } from '@/layout/components/PageHeader';
import RegionForm from './components/region-form';
import { useTranslation } from 'react-i18next';

export default function CreateRegion() {
    const { t } = useTranslation();
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('regions.create')} subtitle={t("regions.createDescription")}>
            </PageHeader>
            <RegionForm />
        </div>
    );
}
