import { defineMiddleware } from "astro:middleware";
import { paraglideMiddleware } from "./paraglide/server.js";
import { m } from "./paraglide/messages.js";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies } = context;
  const url = new URL(request.url);

  const session = await fetch("http://localhost:3000/api/auth/get-session", {
    headers: {
      cookie: context.request.headers.get("cookie") ?? "",
    },
  }).then((r) => r.json());

  if (url.pathname === "/") {
    const locale = cookies.get("PARAGLIDE_LOCALE")?.value;

    if (locale) {
      return Response.redirect(new URL(`/${locale}/`, request.url), 302);
    }
  }

  const pathname = url.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");

  const incompleteProfileRoutes =
    pathname === "/complete-profile" ||
    pathname.startsWith("/legal/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/_astro/");

  const guestOnlyRoute =
    pathname.endsWith("/user/login") ||
    pathname.endsWith("/user/register") ||
    (pathname.endsWith("/user/complete-profile") && !pathname.endsWith("/user/complete-profile"));

  const protectedRoute = pathname.endsWith("/user/settings") && !pathname.endsWith("/user/complete-profile");

  if (!incompleteProfileRoutes) {
    if (session?.user && !session.user.name?.trim()) {
      return Response.redirect(new URL("/complete-profile", request.url), 302);
    }
  }

  if (guestOnlyRoute) {
    if (session?.user) {
      return Response.redirect(new URL("/user/settings", request.url), 302);
    }
  }

  if (protectedRoute) {
    if (!session?.user) {
      return Response.redirect(new URL("/user/login", request.url), 302);
    }
  }

  return paraglideMiddleware(request, ({ request }) => next(request));
});
