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

        nationalId: z
            .string()
            .trim()
            .nonempty({ message: 'nationalIdRequired' }),
        profilePhotoUrl: z
            .string()
            .trim()
            .nonempty({ message: 'dealerIdRequired' }),
        vendorId: z
            .number(),
        profileId: z.number().nullable().optional(),
    }).superRefine((data, ctx) => {
        if (data.role === "ClientAdmin" && !data.profileId) {
            ctx.addIssue({
                path: ["profileId"],
                code: z.ZodIssueCode.custom,
                message: "profileIdRequired",
            });
        }
    });

    return z
        .object({
            email: z.string()
                .trim()
                .nonempty({ message: 'emailRequired' })
                .email({ message: 'invalidEmail' }),

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

            nationalId: z
                .string()
                .trim()
                .nonempty({ message: 'nationalIdRequired' }),
            profilePhotoUrl: z
                .string()
                .nonempty({ message: 'dealerIdRequired' }),

            vendorId: z.number(),
            profileId: z.number().nullable().optional(),
        }).superRefine((data, ctx) => {
            if (data.role === "ClientAdmin" && !data.profileId) {
                ctx.addIssue({
                    path: ["profileId"],
                    code: z.ZodIssueCode.custom,
                    message: "profileIdRequired",
                });
            }
        });
};
