import { z } from "zod";

export const eventSchema = z.object({
  project_id: z.string(),
  session_id: z.string(),
  type: z.string(),
  timestamp: z.number(),
  payload: z.object({}),
});

export type userTypes = z.infer<typeof eventSchema>;
