export const NodeEnv = {
  DEVELOPMENT: "development",
  TEST: "test",
  PRODUCTION: "production",
};

export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];
