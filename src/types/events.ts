type EventTypes='api-call' | 'click' | 'page-view'

export interface Events<T>{
  Id String,
 type EventTypes,
  payload T
}
export interface EventResponse{
  success Boolean,
  message?: String,
  eventId: String,
  error: String
}
