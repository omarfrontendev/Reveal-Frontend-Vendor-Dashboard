import { PageHeader } from '@/layout/components/PageHeader';
import AreaForm from './components/area-form';
import { useTranslation } from 'react-i18next';

export default function CreateArea() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('areas.create')} subtitle={t("areas.createDescription")}>
            </PageHeader>
            <AreaForm />
        </div>
    );
}
