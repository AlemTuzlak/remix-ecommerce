import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "~/library/LanguageSwitcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsletterInfo, newsletterSchema } from "~/schemas/newsletter.schema";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { sendConfirmationEmail } from "~/.server/models/newsletter.server";
import { Form } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const resolver = zodResolver(newsletterSchema);
export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues } =
    await getValidatedFormData<NewsletterInfo>(request, resolver);
  if (errors) {
    return json({
      errors,
      defaultValues: receivedValues,
    });
  }
  await sendConfirmationEmail(data.email);
  return redirect("/");
};

export default function Index() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<NewsletterInfo>({
    mode: "onSubmit",
    resolver,
  });
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("hi")}</h1>
      <p>{t("welcome")}</p>
      <LanguageSwitcher />
      <Form onSubmit={handleSubmit}>
        <input
          {...register("email")}
          placeholder="email@email.com"
          name="email"
        />
        {errors.email?.message}
      </Form>
    </div>
  );
}
