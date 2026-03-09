import { PageHeader } from '@/layout/components/PageHeader';
import ShiftForm from './components/shift-form';
import { useTranslation } from 'react-i18next';

export default function CreateShifts() {

    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('shifts.create')} subtitle={t("shifts.createDescription")}>
            </PageHeader>
            <ShiftForm />
        </div>
    );
}
