import { z } from "zod";

export const goalSchema = z.object({
  description: z.string().min(5, "Description must be at least 5 characters"),
  hypnosisScript: z.string().optional(),
  affirmations: z.array(z.string()).optional(),
  userId: z.string().uuid("Invalid user ID"),
});

export type GoalInput = z.infer<typeof goalSchema>;
