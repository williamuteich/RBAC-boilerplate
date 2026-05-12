const ALLOWED_ORIGINS = [
  "https://glamourlindoia.com.br",
  "https://googlegclid.bazarelegance.com.br",
  "http://localhost:8080",
];

export function getAllowedOrigin(origin: string | null) {
  if (!origin) return ALLOWED_ORIGINS[0];
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

export function corsHeaders(origin: string | null) {
  const allowed = getAllowedOrigin(origin);
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
    "Access-Control-Allow-Credentials": "true",
  } as Record<string, string>;
}

export function preflightResponse(origin: string | null) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
