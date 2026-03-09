export const vendorFields = () => {
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
            name: "contactEmail",
            label: "email.label",
            placeholder: "email.placeholder",
            colSpan: "col-span-6",
            type: "email",
            required: true,
        },
        {
            name: "phoneNumber",
            label: "phone.label",
            placeholder: "phone.placeholder",
            colSpan: "col-span-6",
            type: "number",
            required: false
        },
    ];
}
