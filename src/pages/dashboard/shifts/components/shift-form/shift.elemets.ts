import type { DayBody } from "@/constants/weekDays";

export const shiftFields = (id, days: DayBody[]) => {
    if(id) {
        return [
            {
                name: "name",
                label: "name.label",
                placeholder: "name.placeholder",
                colSpan: "col-span-6",
                type: "text",
                required: true,
            },
            {
                name: "day",
                label: "day.label",
                placeholder: "day.placeholder",
                colSpan: "col-span-6",
                type: "select",
                required: true,
                list: days,
            },
            {
                name: "startTime",
                label: "startTime.label",
                placeholder: "startTime.placeholder",
                colSpan: "col-span-6",
                required: true,
                type: "time",
            },
            {
                name: "endTime",
                label: "endTime.label",
                placeholder: "endTime.placeholder",
                colSpan: "col-span-6",
                type: "time",
                required: false,
            },
        ];
    }
    return [
        {
            name: "name",
            label: "name.label",
            placeholder: "name.placeholder",
            colSpan: "col-span-6",
            type: "text",
            required: true,
        },
        {
            name: "days",
            label: "day.label",
            placeholder: "day.placeholder",
            colSpan: "col-span-6",
            type: "select",
            required: true,
            list: days,
            isMulti: true
        },
        // {
        //     name: "test",
        //     type: "spacer",
        //     colSpan: "col-span-6",
        // },
        {
            name: "startTime",
            label: "startTime.label",
            placeholder: "startTime.placeholder",
            colSpan: "col-span-6",
            required: true,
            type: "time",
        },
        {
            name: "endTime",
            label: "endTime.label",
            placeholder: "endTime.placeholder",
            colSpan: "col-span-6",
            type: "time",
            required: false,
        },
    ];
}