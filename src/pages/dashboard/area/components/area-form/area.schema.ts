import { z } from 'zod';

export const getAreaSchema = () => {
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
    areaCode: z.string().trim(),
    vendorId: z.any(),
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
