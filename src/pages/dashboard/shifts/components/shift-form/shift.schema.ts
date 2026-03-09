import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const getShiftSchema = (id) => {
    if (id) {
        return z.object({
            name: z.string()
                .trim()
                .nonempty({ message: 'nameRequired' }),
            day: z.string()
                .trim()
                .nonempty({ message: 'dayRequired' }),
            startTime: z
                .string()
                .min(1, "startTimeRequired")
                .regex(timeRegex, "invalidTime"),

            endTime: z
                .string()
                .min(1, "endTimeRequired")
                .regex(timeRegex, "invalidTime"),
            clientId: z.any()
        }).refine(
            (data) => data.endTime > data.startTime,
            {
                message: "endAfterStart",
                path: ["endTime"],
            }
        );
    }
    return z.object({
        name: z.string()
            .trim()
            .nonempty({ message: 'nameRequired' }),
        days: z
            .array(z.string())
            .min(1, { message: 'dayRequired' })
            .nonempty({ message: 'dayRequired' }),
        startTime: z
            .string()
            .min(1, "startTimeRequired")
            .regex(timeRegex, "invalidTime"),

        endTime: z
            .string()
            .min(1, "endTimeRequired")
            .regex(timeRegex, "invalidTime"),
        clientId: z.any()
    }).refine(
        (data) => data.endTime > data.startTime,
        {
            message: "endAfterStart",
            path: ["endTime"],
        }
    );
};
