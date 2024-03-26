import { z } from 'zod';

export const getIPAddressFormSchema = z.object({
  ipAddress: z
    .string()
    .ip()
});

export type GetIPAddressFormData = z.infer<typeof getIPAddressFormSchema>;
