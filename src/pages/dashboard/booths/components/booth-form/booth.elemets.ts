
export const bootheFields = (malls: any[], mallsLoading: boolean, shifts: any[], shiftsLoading: boolean) => {

    return [
        {
            name: "name",
            label: "name.label",
            placeholder: "name.placeholder",
            colSpan: "col-span-6",
            required: true,
            type: "text"
        },
        {
            name: "code",
            label: "code.label",
            placeholder: "code.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: true,
        },
        {
            name: "mallId",
            label: "mall",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: malls,
            isLoading: mallsLoading,
        },
        {
            name: "shiftIds",
            label: "shift",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: shifts,
            isLoading: shiftsLoading,
            isMulti: true
        },
        {
            name: "cameraConfig.rtspUrl",
            label: "rtspUrl",
            placeholder: "rtspUrl",
            colSpan: "col-span-6",
            required: true,
            type: "text"
        },
        {
            name: "cameraConfig.username",
            label: "cameraUserName",
            placeholder: "cameraUserName",
            colSpan: "col-span-6",
            required: true,
            type: "text"
        },
        {
            name: "cameraConfig.password",
            label: "cameraPassword",
            placeholder: "cameraPassword",
            colSpan: "col-span-6",
            required: true,
            type: "text"
        },
    ];
}