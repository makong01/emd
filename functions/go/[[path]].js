export function onRequestGet(context) {
  const slug = new URL(context.request.url).pathname.replace(/^\/go\//, "");

  const redirects = {
    "brand-a": "https://affiliate.example.com/brand-a"
  };

  if (!redirects[slug]) {
    return new Response("Not found", { status: 404 });
  }

  return Response.redirect(redirects[slug], 302);
}