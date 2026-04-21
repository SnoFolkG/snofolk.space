export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/album" && url.searchParams.has("id")) {
      return Response.redirect(`${url.origin}/albums/${url.searchParams.get("id")}`, 301);
    }
    return env.ASSETS.fetch(req);
  }
};
