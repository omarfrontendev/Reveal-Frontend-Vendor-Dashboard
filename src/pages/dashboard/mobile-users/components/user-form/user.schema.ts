import { z } from 'zod';

export const getUserSchema = (id: any) => {
    if (id) return z.object({
        email: z.email().trim().nonempty({ message: 'emailRequired' }),
        firstName: z
            .string()
            .trim()
            .nonempty({ message: 'nameRequired' }),
        lastName: z
            .string()
            .trim()
            .nonempty({ message: 'nameRequired' }),
        role: z
            .string()
            .nonempty({ message: 'roleRequired' }),
        phone: z
            .string()
            .trim()
            .nonempty({ message: 'phoneRequired' }),
        // .regex(/^\+?[0-9]\d{7,14}$/, { message: 'invalidPhoneNumber' }),

        nationalId: z
            .string()
            .trim()
            .nonempty({ message: 'nationalIdRequired' }),

        employeeCode: z
            .string()
            .trim()
            .nonempty({ message: 'employeeCodeRequired' }),

        dealerId: z
            .string()
            .trim()
            .nonempty({ message: 'dealerIdRequired' }),
        profilePhotoUrl: z
            .string()
            .nonempty({ message: 'dealerIdRequired' }),
        vendorId: z
            .number(),
    });

    return z
        .object({
            email: z.string()
                .nonempty({ message: 'emailRequired' })
                .email({ message: 'invalidEmail' }),

            firstName: z
                .string()
                .nonempty({ message: 'nameRequired' }),

            lastName: z
                .string()
                .nonempty({ message: 'nameRequired' }),

            role: z
                .string()
                .nonempty({ message: 'roleRequired' }),

            phone: z
                .string()
                .nonempty({ message: 'phoneRequired' }),

            nationalId: z
                .string()
                .nonempty({ message: 'nationalIdRequired' }),

            employeeCode: z
                .string()
                .nonempty({ message: 'employeeCodeRequired' }),

            dealerId: z
                .string()
                .nonempty({ message: 'dealerIdRequired' }),
            profilePhotoUrl: z
                .string()
                .nonempty({ message: 'dealerIdRequired' }),

            vendorId: z.number(),
        })
};
