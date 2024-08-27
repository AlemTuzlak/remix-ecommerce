import React from "react";

import { Body, Font, Head, Html, Tailwind } from "@react-email/components";
// @ts-ignore
import tailwindConfig from "./tailwind.config";
import { ReactNode } from "react";

export const EmailTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily={"Verdana"}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
            format: "woff2",
          }}
        />
      </Head>
      <Tailwind config={tailwindConfig}>
        <Body>{children}</Body>
      </Tailwind>
    </Html>
  );
};
