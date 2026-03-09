
export const mallFields = (subRegions: any[], subRegionLoading: boolean, selectedCoords: any[], id: any) => {

    return [
        {
            name: "nameEn",
            label: "nameEn.label",
            placeholder: "nameEn.placeholder",
            colSpan: "col-span-6",
            required: true,
            type: "text"
        },
        {
            name: "nameAr",
            label: "nameAr.label",
            placeholder: "nameAr.placeholder",
            colSpan: "col-span-6",
            required: true,
            type: "text",

        },
        {
            name: "address",
            label: "address.label",
            placeholder: "address.placeholder",
            colSpan: "col-span-6",
            required: false,
            type: "text",

        },
        {
            name: "code",
            label: "code.label",
            placeholder: "code.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: false,
        },
        {
            name: "subRegionId",
            label: "subregion",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: subRegions,
            isLoading: subRegionLoading,
            isDisabled: id && true
        },
        {
            name: "coords",
            label: "coords.label",
            colSpan: "col-span-12",
            type: "map",
            required: true,
            selectedCoords
        },
    ];
}