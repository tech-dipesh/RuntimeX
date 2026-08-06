export const AllAppRoutes = {
  HOME: '/',
  EVENTS: '/api/v1',
  HEALTH: '/health',
  PROJECTS: '/api/v1/projects'
} as const;

interface Error {
  statusCode?: number;
  message?: string
}