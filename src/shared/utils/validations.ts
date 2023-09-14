import { z } from 'zod';

import { formErrors } from '~/shared/configs';

export const passwordValidation = z
  .string()
  .min(8, formErrors.PASSWORD_MIN_LENGTH)
  .refine(value => {
    if (!value) return false;
    return /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$/.test(value);
  }, formErrors.INVALID_PASSWORD);

export const fileValidation = z
  .union([z.string(), z.instanceof(File)])
  .nullable()
  .refine(value => {
    if (value instanceof File) {
      return value.size < 2 * 1024 * 1024;
    }
    return true;
  }, formErrors.MAX_IMAGE_SIZE);
