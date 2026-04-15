import { useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSingleUser } from "@/hooks/users/useSingleUser";
import { useShifts } from "@/hooks/shift/useShifts";
import { useAreas } from "@/hooks/area/useAreas";
import { useRegions } from "@/hooks/regions/useRegions";
import { useSubRegions } from "@/hooks/sub-regions/useSubRegions";
import { mapToOptions, resetFields } from "@/utils/helper";
import type { User } from "@/types/users";
import { getUserSchema } from "../user.schema";
import { useBooths } from "@/hooks/booths/useBooths";

export const useUserForm = (id?: string) => {
    const { user } = useSingleUser(id);

    const form = useForm({
        resolver: zodResolver(getUserSchema()),
        defaultValues: {
            profilePhotoUrl: "https://example.com/profile.jpg",
        },
        mode: "all"
    });

    const role = useWatch({ control: form.control, name: "role" });
    const boothId = useWatch({ control: form.control, name: "vendorBoothId" });
    const areaId = useWatch({ control: form.control, name: "vendorAreaId" });
    const regionId = useWatch({ control: form.control, name: "vendorRegionId" });

    //  dependency
    const isFirstBoothRender = useRef(true);
    const isFirstAreaRender = useRef(true);
    const isFirstRegionRender = useRef(true);

    // fetch
    const { booths, isLoading: isBoothsLoading } = useBooths(role === "VendorMobileSales");
    const { shifts, isLoading: isShiftsLoading } = useShifts(role === "VendorMobileSales" && !!boothId, boothId);
    const { areas, isLoading: isAreasLoading } = useAreas(role === "VendorMobileSupervisor");
    const { regions, isLoading: isRegionsLoading } = useRegions(areaId);
    const { subRegions, isLoading: isSubRegionsLoading } = useSubRegions(regionId);

    // options
    const boothsOptions = useMemo(() => mapToOptions(booths, "name"), [booths]);
    const shiftsOptions = useMemo(() => mapToOptions(shifts, "name"), [shifts]);
    const areasOptions = useMemo(() => mapToOptions(areas, "nameEn"), [areas]);
    const regionsOptions = useMemo(() => mapToOptions(regions, "nameEn"), [regions]);
    const subRegionsOptions = useMemo(() => mapToOptions(subRegions, "nameEn"), [subRegions]);

    // reset on role change
    useEffect(() => {
        if (role !== "VendorMobileSales") {
            resetFields(["vendorShiftIds", "vendorBoothId"], form);
        }
        if (role !== "VendorMobileSupervisor") {
            resetFields(["vendorAreaId", "vendorRegionId", "vendorSubRegionId"], form);
        }
    }, [role]);

    console.log(form.formState.errors);

    // map user
    const mapUserToForm = (user: User) => ({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        nationalId: user.nationalId,
        employeeCode: user.employeeCode,
        dealerId: user.dealerId,
        vendorBoothId: user.vendorBoothId,
        vendorShiftIds: user.vendorShifts?.map(shift => shift?.id),
        vendorAreaId: user.vendorAreaId,
        vendorRegionId: user.vendorRegionId,
        vendorSubRegionId: user.vendorSubRegionId,
    });

    // set user data
    useEffect(() => {
        if (user) {
            form.reset({
                profilePhotoUrl: "https://example.com/profile.jpg",
                ...mapUserToForm(user),
            });

            isFirstBoothRender.current = true;
            isFirstAreaRender.current = true;
            isFirstRegionRender.current = true;
        }
    }, [user]);

    // dependencies reset
    useEffect(() => {
        if (isFirstBoothRender.current) {
            isFirstBoothRender.current = false;
            return;
        }
        resetFields(["vendorShiftIds"], form);
    }, [boothId]);

    useEffect(() => {
        if (isFirstAreaRender.current) {
            isFirstAreaRender.current = false;
            return;
        }
        resetFields(["vendorRegionId", "vendorSubRegionId"], form);
    }, [areaId]);

    useEffect(() => {
        if (isFirstRegionRender.current) {
            isFirstRegionRender.current = false;
            return;
        }
        resetFields(["vendorSubRegionId"], form);
    }, [regionId]);

    return {
        form,
        role,
        boothsOptions,
        isBoothsLoading,
        shiftsOptions,
        isShiftsLoading,
        areasOptions,
        isAreasLoading,
        regionsOptions,
        isRegionsLoading,
        subRegionsOptions,
        isSubRegionsLoading
    };
};