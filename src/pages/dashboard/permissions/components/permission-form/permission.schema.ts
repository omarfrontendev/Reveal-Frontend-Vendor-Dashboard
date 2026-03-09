import { z } from 'zod';

export const getPermissionSchema = () => {
    return z
        .object({
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
            permissionKeys: z.array(z.string())
        })
};
