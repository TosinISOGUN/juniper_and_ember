import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ActionBar } from "@/components/action-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeInitScript } from "@/components/theme-toggle";
import { CartProvider } from "@/lib/cart-context";

import appCss from "../styles.css?url";

function Message({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="wrap grid min-h-[70dvh] content-center py-32">
      <p className="eyebrow">Juniper &amp; Ember</p>
      <h1 className="display-xl mt-4 max-w-[12ch]">{title}</h1>
      <p className="lead mt-6">{text}</p>
      <div className="mt-8 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

function NotFound() {
  return (
    <Message
      title="That table is not here."
      text="The page may have moved. Head back home, or have a look at the menu."
    >
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <Link to="/menu" className="btn btn-ghost">
        See the menu
      </Link>
    </Message>
  );
}

function RouteError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <Message
      title="This page did not load."
      text="Something went wrong on our side. Try again, or head back home."
    >
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          void router.invalidate();
          reset();
        }}
      >
        Try again
      </button>
      <a href="/" className="btn btn-ghost">
        Back home
      </a>
    </Message>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#172923" },
      { name: "author", content: "Juniper & Ember (a fictional design concept)" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/zodiak-var.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/karla-var.woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon-192.png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <CartProvider>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <ActionBar />
      <CartDrawer />
    </CartProvider>
  );
}
