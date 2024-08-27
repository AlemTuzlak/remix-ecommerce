import { PassThrough } from "stream";
import { Response } from "@remix-run/web-fetch";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import i18nextConfig from "./localization/i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import i18n from "./localization/i18n"; // your i18n configuration file
import { resolve } from "node:path";
import { resources } from "./localization/resource";
import { getClientEnv, initEnv } from "./.server/env.server";
import { AppLoadContext, EntryContext } from "@remix-run/node";
import { createHonoServer } from "react-router-hono-server/node";
import { Context } from "hono";
import { i18next } from "remix-hono/i18next";

const ABORT_DELAY = 5000;
// Initialize environment variables
const env = initEnv();

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  let callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  let instance = createInstance();
  let ns = i18nextConfig.getRouteNamespaces(remixContext as any);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n, // spread the configuration
      lng: loadContext.locale, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
      resources,
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            // @ts-expect-error
            loadContext.body(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

const getLoadContext = async (c: Context) => {
  const locale = i18next.getLocale(c);
  const t = i18next.getFixedT(c);
  const clientEnv = getClientEnv();

  return {
    locale,
    t,
    env,
    clientEnv,
    body: c.body,
  };
};

interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}

declare module "@remix-run/node" {
  interface AppLoadContext extends Omit<LoadContext, "body"> {}
}

export const server = await createHonoServer({
  configure(server) {
    server.use("*", i18next(i18nextConfig));
  },
  getLoadContext,
});
