import { PageHeader } from '@/layout/components/PageHeader';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSingleVendor } from '@/hooks/vendors/useSingleVendor';
import { Badge } from '@/components/ui/badge';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function VendorProfile() {

    const { id } = useParams();
    const { t } = useTranslation();
    const { vendor, isLoading, isError } = useSingleVendor(id);

    const spinner = <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

    if (isError) return <ErrorMessage message={isError?.response?.data?.message} />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader title={t('vendors.vendorDetails')} subtitle={t("vendors.profileDescription")} />

            <div className="grid grid-cols-1 gap-y-4 text-sm">
                <div className="bg-white shadow-md rounded-xl p-6">
                    <div className="divide-y">

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.nameEn.label")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.nameEn}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.nameAr.label")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.nameAr}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.areaCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.areaCount}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.regionCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.regionCount}

                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.subRegionCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.subRegionCount}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.boothsCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.boothsCount}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.dashboardUsersCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.dashboardUsersCount}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.mobileUsersCount")}</div>
                            <div className="font-medium">
                                {isLoading ? spinner : vendor?.mobileUsersCount}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-3">
                            <div className="text-gray-500">{t("fields.status.label")}</div>
                            <div>
                                {isLoading ? spinner : (
                                    <Badge variant={vendor?.status === "active" ? "activate" : "destructive"}>
                                        {vendor?.status.toUpperCase()}
                                    </Badge>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
