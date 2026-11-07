export default {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);

    if (!incomingUrl.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    const apiOrigin = env.API_ORIGIN?.replace(/\/$/, '');
    if (!apiOrigin) {
      return Response.json({ success: false, message: 'The API origin is not configured.' }, { status: 503 });
    }

    const upstreamUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, `${apiOrigin}/`);
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.set('x-forwarded-host', incomingUrl.host);
    headers.set('x-forwarded-proto', incomingUrl.protocol.slice(0, -1));

    const init = { method: request.method, headers, redirect: 'manual' };
    if (request.method !== 'GET' && request.method !== 'HEAD') init.body = request.body;
    return fetch(new Request(upstreamUrl, init));
  },
};
