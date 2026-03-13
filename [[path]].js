// functions/[[path]].js
const routes = {
  "/hosting": "https://partner.example.net/ref/123?offer=hosting",
  "/vps": "https://partner.example.net/ref/123?offer=vps",
  "/seo": "https://affiliate.example.org/?ref=abc&product=seo",
}

export async function onRequest(context) {
  const reqUrl = new URL(context.request.url)
  const path = reqUrl.pathname.replace(/\/+$/, "") || "/"

  if (path === "/") {
    return context.env.ASSETS.fetch(new Request(new URL("/", reqUrl), context.request))
  }

  const target = routes[path]
  if (!target) {
    return new Response("Not found", { status: 404 })
  }

  const dest = new URL(target)

  for (const [k, v] of reqUrl.searchParams.entries()) {
    dest.searchParams.set(k, v)
  }

  return Response.redirect(dest.toString(), 302)
}