import { z } from "zod";

export const eventSchema = z.object({
  project_id: z.string(),
  session_id: z.string(),
  type: z.string(),
  timestamp: z.number(),
  payload: z.object({}),
});

export type userTypes = z.infer<typeof eventSchema>;
const singleEventSchema = z.object({
  projectId: z.string().min(1),
  sessionId: z.string().min(1),
  type: z.string().min(1),
  timestamp: z.number(),
  payload: z.object({}).passthrough(),
});

export const batchSchema = z.array(singleEventSchema);
