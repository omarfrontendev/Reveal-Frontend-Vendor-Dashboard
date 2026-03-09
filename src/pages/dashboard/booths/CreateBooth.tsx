import { PageHeader } from '@/layout/components/PageHeader';
import BoothForm from './components/booth-form';
import { useTranslation } from 'react-i18next';

export default function CreateBooth() {

    const {t} = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t("booths.create")} subtitle={t("booths.createDescription")}>
            </PageHeader>
            <BoothForm />
        </div>
    );
}
