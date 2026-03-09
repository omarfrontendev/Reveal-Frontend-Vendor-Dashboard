import { z } from 'zod';

export const getVendorSchema = () => {
    return z
        .object({
            contactEmail: z.email({ message: "invalidEmail" }).trim().nonempty({ message: 'emailRequired' }),
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
            phoneNumber: z
                .string()
                .trim(),
                // .nonempty({ message: 'phoneRequired' }),
            clientId: z
                .number(),
            vendorSuperAdminId: z
                .any(),
        })
};
