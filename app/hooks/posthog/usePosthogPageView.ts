import { useLocation } from "@remix-run/react";
import { posthog } from "posthog-js";
import { useEffect, useState } from "react";

const usePosthogPageView = () => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location.pathname);
  useEffect(() => {
    if (location.pathname !== previousLocation) {
      posthog.capture("$pageview");
      setPreviousLocation(location.pathname);
    }
  }, [location, previousLocation]);
};

export { usePosthogPageView };
