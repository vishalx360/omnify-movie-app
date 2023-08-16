import { searchSchema } from "@/utils/ValidationSchema";
import { ErrorMessage, Field, Form, Formik, type FieldProps } from "formik";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchInput() {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        validationSchema={toFormikValidationSchema(searchSchema)}
        onSubmit={async (values) => {
          await router.push(`/search/${values.query}`);
        }}
      >
        <Form>
          <div className="flex w-full max-w-[310px] items-center gap-2">
            <Field name="query">
              {({ field }: FieldProps) => (
                <Input
                  className="rounded-xl px-5"
                  type="text"
                  placeholder="Search for a movie"
                  id="query"
                  required
                  {...field}
                />
              )}
            </Field>
            <Button size="sm" type="submit" LeftIcon={Search} className="px-5">
              Search
            </Button>
          </div>
          <div className="ml-2 mt-2 text-sm text-red-500">
            <ErrorMessage name="name" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
