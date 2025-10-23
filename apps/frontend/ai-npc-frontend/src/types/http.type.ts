export type RequestCache =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached";

export type HttpOptions = {
  cache?: RequestCache;
  method?: HttpMethod;
} & RequestInit;

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";
