const REDIRECTS = {
  "/podcast": "https://podcasts.apple.com/us/podcast/the-tlv-prompt-with-george-k-stein/id6825437097",
  "/apple": "https://podcasts.apple.com/us/podcast/the-tlv-prompt-with-george-k-stein/id6825437097",
  "/spotify": "https://open.spotify.com/show/2SqYFtDRt0VWzPNEvR9a9W",
  "/cloudinary": "https://blogs.timesofisrael.com/hakatze-cloudinary/",
  "/feed": "https://georgekstein.pages.dev/feed.xml",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (REDIRECTS[path]) {
      return Response.redirect(REDIRECTS[path], 302);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
