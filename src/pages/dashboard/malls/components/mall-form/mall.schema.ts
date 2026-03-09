import { z } from 'zod';

export const getMallSchema = () => {
    return z.object({
        nameEn: z
            .string()
            .trim()
            .nonempty({ message: 'nameRequired' })
            .refine((val) => !/[\u0600-\u06FF]/.test(val), {
                message: 'arabicLettersNotAllowed',
            }),
        nameAr: z
            .string()
            .trim()
            .nonempty({ message: 'nameRequired' })
            .refine((val) => !/[A-Za-z]/.test(val), {
                message: 'englishLettersNotAllowed',
            }),
        address: z
            .string().trim(),
        code: z
            .string().trim(),
        clientId: z
            .any(),
        subRegionId: z
            .number({ message: "subRegionRequired" }),
        coords: z
            .array(
                z.object({
                    lat: z.number(),
                    lng: z.number(),
                })
            )
            .min(1, { message: 'coordinatesRequired' })
            .nonempty({ message: 'coordinatesRequired' }),
    });
};
