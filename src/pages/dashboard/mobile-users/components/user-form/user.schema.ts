import { z } from 'zod';

export const getUserSchema = () => {
    // if (id) return z.object({
    //     email: z.email().trim().nonempty({ message: 'emailRequired' }),
    //     firstName: z
    //         .string()
    //         .trim()
    //         .nonempty({ message: 'nameRequired' }),
    //     lastName: z
    //         .string()
    //         .trim()
    //         .nonempty({ message: 'nameRequired' }),
    //     role: z
    //         .string()
    //         .nonempty({ message: 'roleRequired' }),
    //     phone: z
    //         .string()
    //         .trim(),
    //     nationalId: z
    //         .string()
    //         .trim()
    //         .nonempty({ message: 'nationalIdRequired' }),

    //     employeeCode: z
    //         .string()
    //         .trim()
    //         .nonempty({ message: 'employeeCodeRequired' }),

    //     dealerId: z
    //         .string()
    //         .trim()
    //         .nonempty({ message: 'dealerIdRequired' }),
    //     profilePhotoUrl: z
    //         .string()
    //         .nonempty({ message: 'dealerIdRequired' }),
    // });

    return z
        .object({
            email: z.string().trim()
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
                .trim(),

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

            vendorBoothId: z.number().nullable().optional(),
            vendorShiftId: z.number().nullable().optional(),
            vendorAreaId: z.number().nullable().optional(),
            vendorRegionId: z.number().nullable().optional(),
            vendorSubRegionId: z.number().nullable().optional(),
            // vendorId: z.number(),
        })
        .superRefine((data, ctx) => {
            if (data.role === "VendorMobileSales" && !data.vendorBoothId) {
                ctx.addIssue({
                    path: ["vendorBoothId"],
                    code: z.ZodIssueCode.custom,
                    message: "boothIdRequired",
                });
            }
            if (data.role === "VendorMobileSales" && !data.vendorShiftId) {
                ctx.addIssue({
                    path: ["vendorShiftId"],
                    code: z.ZodIssueCode.custom,
                    message: "shiftIdRequired",
                });
            }
            if (data.role === "VendorMobileSupervisor" && !data.vendorAreaId) {
                ctx.addIssue({
                    path: ["vendorAreaId"],
                    code: z.ZodIssueCode.custom,
                    message: "areaRequired",
                });
            }
        });
};
