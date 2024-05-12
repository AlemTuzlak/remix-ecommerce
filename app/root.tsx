import type { ActionFunctionArgs } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css?inline";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import i18next from "./localization/i18n.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { returnLanguageIfSupported } from "./localization/resource";
import tailwindcss from "./tailwind.css?url";
import sprite from "./library/icon/icons/icon.svg?url";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = returnLanguageIfSupported(params.lang);
  let locale = lang ?? (await i18next.getLocale(request));

  return json({ locale });
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindcss },
  {
    rel: "preload",
    href: sprite,
    as: "image",
    type: "image/svg+xml",
  },
];

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
