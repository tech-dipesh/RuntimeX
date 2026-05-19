type EventTypes = 'api-call' | 'click' | 'page-view';

export interface Events<T> {
  id: string;
  type: EventTypes;
  payload: T;
}

export interface EventResponse {
  success: boolean;
  message?: string;
  eventId: string;
  error?: string;
}
