 export type EventTypes = 'api-call' | 'click' | 'page-view';
//
// export interface Events<T> {
//   id: string;
//   type: EventTypes;
//   payload: T;
// }
//
// export interface EventResponse {
//   success: boolean;
//   message?: string;
//   eventId: string;
//   error?: string;
// }

export enum TYPE_ENUM {
  API_CALL = 'api_call',
  CLICK = 'click',
  PAGE_VIEW = 'page_view'
}

// export type ResponseFormat = {
  
//   return res.status(400).json(
//     {
//       success: false,
//       message: "Zod Validation Error",
//       { message: "Please enter a Id" });
//   data: error.message,
//   errors: error.name
// }

// }