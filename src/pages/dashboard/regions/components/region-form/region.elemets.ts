
export const regionFields = (areas: any[], areaLoading: boolean, selectedCoords: any[], id: any) => {

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
            name: "areaId",
            label: "area",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: areas,
            isLoading: areaLoading,
            isDisabled: id && true
        },
        {
            name: "regionCode",
            label: "code.label",
            placeholder: "code.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: false,
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