
export const areaFields = () => {
    return [
        {
            name: "nameEn",
            label: "nameEn.label",
            placeholder: "nameEn.placeholder",
            colSpan: "col-span-6",
            required: true,
            type: "text",
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
            name: "areaCode",
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
        },
    ];
}