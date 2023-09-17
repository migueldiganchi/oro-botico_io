export default function(context) {
  console.info("[Middleware] load-auth");
  context.store.dispatch("loadAuthentication", context.req);
}
