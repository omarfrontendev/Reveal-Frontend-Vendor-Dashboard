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
            type: "spacer",
            colSpan: "col-span-6",
        },
        {
            name: "role",
            label: "role.label",
            placeholder: "role.placeholder",
            colSpan: "col-span-6",
            type: "select",
            required: false,
            list: roles
        },
    ];
}
