
export const subRegionFields = (areas: any[], areaLoading: boolean, selectedCoords: any[], id: any) => {

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
            name: "regionId",
            label: "region",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: areas,
            isLoading: areaLoading,
            isDisabled: id && true
        },
        {
            name: "code",
            label: "code.label",
            colSpan: "col-span-6",
            type: "text",
            required: false,
            placeholder: "code.placeholder",
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