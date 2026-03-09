import { PageHeader } from '@/layout/components/PageHeader';
import SubRegionForm from './components/sub-region-form';
import { useTranslation } from 'react-i18next';

export default function CreateSubRegion() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('subregions.create')} subtitle={t("subregions.createDescription")}>
            </PageHeader>
            <SubRegionForm />
        </div>
    );
}
