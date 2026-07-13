const RENDER_ORIGIN = 'https://octazen-website.onrender.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) {
      const target = new URL(url.pathname + url.search, RENDER_ORIGIN);
      return fetch(new Request(target, request));
    }

    return env.ASSETS.fetch(request);
  },
};
