import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import MallForm from './components/mall-form';
import { useTranslation } from 'react-i18next';

export default function UpdateMall() {

    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('malls.update')} subtitle={t("malls.updateDescription")}>
            </PageHeader>
            <MallForm id={id} />
        </div>
    );
}
