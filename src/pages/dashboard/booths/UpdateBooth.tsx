import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import SubRegionForm from './components/booth-form';
import { useTranslation } from 'react-i18next';

export default function UpdateBooth() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t("booths.update")} subtitle={t("booths.updateDescription")}>
            </PageHeader>
            <SubRegionForm id={id} />
        </div>
    );
}
