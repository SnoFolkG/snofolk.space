export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/album" && url.searchParams.has("id")) {
      const slug = url.searchParams.get("id");
      return Response.redirect(`${url.origin}/albums/${slug}`, 301);
    }
    return env.ASSETS.fetch(req);
  }
};
