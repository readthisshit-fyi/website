import { defineMiddleware } from "astro:middleware";
import { paraglideMiddleware } from "./paraglide/server.js";

export const onRequest = defineMiddleware((context, next) => {
  const { request, cookies } = context;
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const locale = cookies.get("PARAGLIDE_LOCALE")?.value;

    if (locale) {
      return Response.redirect(new URL(`/${locale}/`, request.url), 302);
    }
  }

  return paraglideMiddleware(request, ({ request }) => next(request));
});
