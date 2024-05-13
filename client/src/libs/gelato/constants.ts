export const BASE_URL = "https://ecommerce.gelatoapis.com/" as const;
export const VERSIONS = ["v1"] as const;
export type VERSION = (typeof VERSIONS)[number];
