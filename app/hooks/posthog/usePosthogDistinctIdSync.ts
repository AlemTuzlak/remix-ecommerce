import { useLoaderData } from "@remix-run/react";
import { posthog } from "posthog-js";
import { useEffect } from "react";

const usePosthogDistinctIdSync = () => {
  const loaderData = useLoaderData<{ distinctId: string | undefined }>();
  const distinctId = loaderData?.distinctId;

  useEffect(() => {
    if (!distinctId) return;
    if (posthog.get_distinct_id() === distinctId) return;
    posthog.identify(distinctId);
  }, [distinctId]);
};

export { usePosthogDistinctIdSync };
