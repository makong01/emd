export function onRequest(context) {
  return new Response("go function works", {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=UTF-8"
    }
  });
}