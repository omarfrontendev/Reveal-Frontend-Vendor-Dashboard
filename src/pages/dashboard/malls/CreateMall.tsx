import { PageHeader } from '@/layout/components/PageHeader';
import MallForm from './components/mall-form';
import { useTranslation } from 'react-i18next';

export default function CreateMall() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('malls.create')} subtitle={t("malls.createDescription")}>
            </PageHeader>
            <MallForm />
        </div>
    );
}
