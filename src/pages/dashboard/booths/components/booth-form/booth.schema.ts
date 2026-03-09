import { z } from 'zod';

export const getBoothSchema = () => {
    return z.object({
        name: z
            .string()
            .trim()
            .nonempty({ message: 'nameRequired' }),
        code: z
            .string()
            .trim()
            .nonempty({ message: 'codeRequired' }),
        mallId: z
            .number({ message: "mallRequired" }),
        clientId: z
            .number(),
        shiftIds: z
            .array(z.number({ message: "shiftRequired" }), { message: "shiftRequired" })
            .min(1, { message: "shiftRequired" })
            .nonempty({ message: 'shiftRequired' }),
        cameraConfig: z.object({
            rtspUrl: z.string().trim().url({message: "invalidURL"}).refine((val) =>
                val.startsWith("rtsp://"),
                { message: "rtspUrl must start with rtsp://" }
            ),
            username: z.string().trim().nonempty({ message: 'nameRequired' }),
            password: z.string().nonempty({ message: 'passwordRequired' }),
        })
    });
};
