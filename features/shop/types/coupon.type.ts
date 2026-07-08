import { z } from "zod";

import { applyCouponSchema } from "../schemas";

export type CouponFormData = z.infer<typeof applyCouponSchema>;
