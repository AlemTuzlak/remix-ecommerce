import { PostHog } from "posthog-node";
import { getServerEnv } from "../env.server";
import { getClientIPAddress } from "remix-utils/get-client-ip-address";
import crypto from "node:crypto";

let posthogInstance: PostHog;
const uuid = crypto.randomUUID();

const getPosthogInstance = () => {
  const env = getServerEnv();
  if (!posthogInstance) {
    posthogInstance = new PostHog(env.POSTHOG_API_KEY, {
      host: env.POSTHOG_API_ENDPOINT,
    });
  }
  return posthogInstance;
};

const posthogServer = getPosthogInstance();

export const getPosthogDistinctId = (request: Request) => {
  const ip = getClientIPAddress(request);
  if (!ip) {
    return uuid;
  }
  return ip;
};
type PosthogEvent = Parameters<PostHog["capture"]>[0];

export const capturePosthogServerEvent = (
  event: Omit<PosthogEvent, "distinctId">,
  request: Request
) => {
  const distinctId = getPosthogDistinctId(request);
  posthogServer.capture({ ...event, distinctId });
};

export { posthogServer };
