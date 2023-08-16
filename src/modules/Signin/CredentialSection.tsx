import { Field, type FieldProps, Form, Formik } from "formik";
import { LucideArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PasswordInput from "@/modules/Global/PasswordInput";
import { SigninSchema } from "@/utils/ValidationSchema";

export function CredentialSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handelCredentialSignin = useCallback(
    async (credentails: { email: string; password: string }) => {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: credentails.email,
        password: credentails.password,
        redirect: false,
      });
      setIsLoading(false);
      if (result?.ok) {
        toast({
          title: "Login successful!",
          description: "Taking you to your dashboard",
        });
        await router.push("/dashboard").catch((err) => console.log(err));
      } else {
        toast({
          variant: "destructive",
          title: result?.error ?? "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [router, toast]
  );
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(SigninSchema)}
        onSubmit={handelCredentialSignin}
      >
        <Form className="space-y-4 md:space-y-6">
          <Field name="email">
            {({ field, meta }: FieldProps) => (
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5  text-neutral-900 focus:border-black focus:ring-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  required
                  {...field}
                />
                {meta.touched && meta.error && (
                  <p className="ml-2 mt-2 text-sm text-red-500">{meta.error}</p>
                )}
              </div>
            )}
          </Field>
          <PasswordInput />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="focus:ring-3 h-4 w-4 rounded border border-neutral-300 bg-neutral-50 checked:bg-black focus:ring-black dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-black"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              href="/resetPassword"
              className="text-sm font-medium text-black hover:underline dark:text-black"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="text-md w-full"
            size="lg"
            LeftIcon={LucideArrowRight}
            isLoading={isLoading}
            loadingText="Checking credentials..."
          >
            Sign in
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
