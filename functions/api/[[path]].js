export async function onRequest({ request, env }) {
  const apiOrigin = env.API_ORIGIN?.replace(/\/$/, '');
  if (!apiOrigin) {
    return new Response('API_ORIGIN is not configured for this Cloudflare Pages deployment.', { status: 503 });
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, `${apiOrigin}/`);
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('x-forwarded-host', incomingUrl.host);
  headers.set('x-forwarded-proto', incomingUrl.protocol.slice(0, -1));

  const init = {
    method: request.method,
    headers,
    redirect: 'manual',
  };
  if (request.method !== 'GET' && request.method !== 'HEAD') init.body = request.body;

  return fetch(new Request(upstreamUrl, init));
}
