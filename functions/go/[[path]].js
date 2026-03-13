import redirectsText from "../../data/redirects.json";

const redirects = JSON.parse(redirectsText);

export function onRequest(context) {
  const method = context.request.method;

  if (method !== "GET" && method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" }
    });
  }

  const url = new URL(context.request.url);
  const slug = url.pathname.replace(/^\/go\//, "").replace(/\/+$/, "");

  if (!slug) {
    return new Response("Missing redirect key", { status: 400 });
  }

  const target = redirects[slug];

  if (!target) {
    return new Response("Redirect target not found", { status: 404 });
  }

  return Response.redirect(target, 302);
}