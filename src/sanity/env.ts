// Public values by design — the project ID is visible in the deployed Studio URL
// and in any NEXT_PUBLIC_ var anyway. Hardcoded fallbacks mean the standalone
// Studio build (which does NOT read .env.local) still boots.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xcdnlzv9";

export const isSanityConfigured = projectId.length > 0;
