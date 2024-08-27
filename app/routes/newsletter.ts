import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { confirmNewsletter } from "~/.server/models/newsletter.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return redirect("/");
  }
  const { error } = await confirmNewsletter(token);
  if (error) {
    return redirect("/");
  }
  return redirect("/");
};
