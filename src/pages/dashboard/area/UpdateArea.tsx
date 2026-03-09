import { PageHeader } from '@/layout/components/PageHeader';
import AreaForm from './components/area-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UpdateArea() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('areas.update')} subtitle={t("areas.updateDescription")}>
            </PageHeader>
            <AreaForm id={id} />
        </div>
    );
}
