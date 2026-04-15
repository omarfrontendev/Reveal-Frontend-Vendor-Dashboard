export const userFields = (roles: any[]) => {

    return [
        {
            name: ".....",
            label: "profilePhoto.label",
            placeholder: "profilePhoto.placeholder",
            colSpan: "col-span-12",
            type: "uploadPhoto",
            required: true,
        },
        {
            name: "firstName",
            label: "firstName.label",
            placeholder: "firstName.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: true,
        },
        {
            name: "lastName",
            label: "lastName.label",
            placeholder: "lastName.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "email.label",
            placeholder: "email.placeholder",
            colSpan: "col-span-6",
            type: "email",
            required: true,
        },
        {
            name: "phone",
            label: "phone.label",
            placeholder: "phone.placeholder",
            colSpan: "col-span-6",
            type: "number",
        },
        {
            name: "nationalId",
            label: "nationalId.label",
            placeholder: "nationalId.placeholder",
            colSpan: "col-span-6",
            type: "number",
            required: true,
        },
        {
            name: "employeeCode",
            label: "employeeCode.label",
            placeholder: "employeeCode.placeholder",
            colSpan: "col-span-6",
            type: "number",
            required: true,
        },
        {
            name: "dealerId",
            label: "dealerId.label",
            placeholder: "dealerId.placeholder",
            colSpan: "col-span-6",
            type: "number",
            required: true,
        },
        {
            name: "...",
            type: "spacer",
            colSpan: "col-span-6"
        },
        {
            name: "role",
            label: "role.label",
            placeholder: "role.placeholder",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: roles
        },
        {
            name: "..",
            type: "spacer",
            colSpan: "col-span-6"
        },
    ];
};

export const salesAgentRequiredFields = (booths: any[], boothsLoading: boolean, shifts: any[], shiftsLoading: boolean) => [
    {
        name: "vendorBoothId",
        label: "booth.label",
        placeholder: "booth.profilePermission",
        colSpan: "col-span-6",
        type: "select",
        required: true,
        list: booths,
        isLoading: boothsLoading
    },
    {
        name: "vendorShiftIds",
        label: "shift",
        placeholder: "shift.placeholder",
        colSpan: "col-span-6",
        type: "select",
        required: true,
        list: shifts,
        isMulti: true,
        isLoading: shiftsLoading
    }];

export const supervisorRequiredFields = (areas: any[], areasLoading: boolean, regions: any[], regionsLoading: boolean, subRegions: any[], subRegionsLoading: boolean) => [
    {
        name: "vendorAreaId",
        label: "area",
        placeholder: "area.placeholder",
        colSpan: "col-span-6",
        type: "select",
        required: true,
        list: areas,
        isLoading: areasLoading
    },
    {
        name: "vendorRegionId",
        label: "region",
        placeholder: "region.placeholder",
        colSpan: "col-span-6",
        type: "select",
        required: false,
        list: regions,
        isLoading: regionsLoading
    },
    {
        name: "vendorSubRegionId",
        label: "subregion",
        placeholder: "subRegion.placeholder",
        colSpan: "col-span-6",
        type: "select",
        required: false,
        list: subRegions,
        isLoading: subRegionsLoading
    },
]
