import React from "react";
import { Button, Container, Hr } from "@react-email/components";
import { EmailTemplate } from "./template";

export const NewsletterEmail = ({
  domain,
  token,
}: {
  domain: string;
  token: string;
}) => {
  return (
    <EmailTemplate>
      <Container className="mt-10 mb-10">
        <h1 className="text-3xl font-bold">Hello!</h1>
        <p className="text-lg">
          We are excited to have you signup for our newsletter. To get started
          click the link below
        </p>
        <Hr />
        <Container>
          <Button
            href={`${domain}/newsletter?token={${token}}`}
            className="font-bold py-2 px-4 text-white bg-pink-600 rounded-lg"
          >
            Subscribe
          </Button>
        </Container>
      </Container>
    </EmailTemplate>
  );
};
