import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import SubRegionForm from './components/sub-region-form';
import { useTranslation } from 'react-i18next';

export default function UpdateSubRegion() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('subregions.update')} subtitle={t("subregions.updateDescription")}>
            </PageHeader>
            <SubRegionForm id={id} />
        </div>
    );
}
