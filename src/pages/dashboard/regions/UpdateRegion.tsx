import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import RegionForm from './components/region-form';
import { useTranslation } from 'react-i18next';

export default function UpdateRegion() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('regions.update')} subtitle={t("regions.updateDescription")}>
            </PageHeader>
            <RegionForm id={id} />
        </div>
    );
}
