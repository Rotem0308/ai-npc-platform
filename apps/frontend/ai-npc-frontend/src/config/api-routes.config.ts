import { env } from "./env.config";

export const ApiRoutes = {
  auth: {
    register: `${env.backendUrl}/auth/register`,
    login: `${env.backendUrl}/auth/login`,
  },
  generator: {
    npcGenerator: `${env.backendUrl}/ai`,
  },
  users: {
    // list: `${env.backendUrl}/users`,
    // profile: (id: string) => `${env.backendUrl}/users/${id}`,
  },
};
