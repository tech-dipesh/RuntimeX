import { z } from "zod";

const EVENT_TYPES = ['api-call', 'click', 'page-view'] as const;

export const eventSchema = z.object({
  project_id: z.string(),
  session_id: z.string(),
  type: z.string(),
  timestamp: z.number(),
  payload: z.object({}),
});

export type userTypes = z.infer<typeof eventSchema>;

const singleEventSchema = z.object({
  project_id: z.string({error: "Please Enter a Project Id"}).min(1).optional(),
  session_id: z.string({error: "Please Enter a session Id"}).min(1).optional(),
  type: z.string({error: "Please Enter a Type Id"}).min(1),
  timestamp: z.number({error: "Please Enter a timestamp Id"}).optional(),
  payload: z.looseObject({})
});
// const singleEventSchema = z.object({
//   type: z.string().refine(
//     (val): val is typeof EVENT_TYPES[number] => EVENT_TYPES.includes(val as any),
//     { message: "Please select a valid event type: 'api-call', 'click', or 'page-view'." }
//   ),  
//  payload: z.string({error: "Please enter a paylod"})
// });
//
export const batchSchema = z.array(singleEventSchema)
