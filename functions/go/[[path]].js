// functions/[[path]].js
import redirectsJson from "../../data/redirects.json";

const redirects = JSON.parse(redirectsJson);

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const slug = url.pathname.replace(/^\/go\//, "").replace(/\/+$/, "");

  if (!slug) {
    return new Response("Missing redirect key", { status: 400 });
  }

  const target = redirects[slug];

  if (!target) {
    return new Response("Redirect target not found", { status: 404 });
  }

  const targetUrl = new URL(target);
  
  /*
  const allowedHosts = [
    "affiliate.example.com",
    "partner.example.net"
  ];

  if (!allowedHosts.includes(targetUrl.hostname)) {
    return new Response("Forbidden redirect target", { status: 403 });
  }*/

  return Response.redirect(targetUrl.toString(), 302);
}