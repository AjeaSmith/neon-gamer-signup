"use client";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import LogoIcon from "../icons/Logo";
import FormStatus from "./FormStatus";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schema";
import SignupForm from "./SignupForm";

const FormWrapper = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      callsign: "",
      email: "",
      password: "",
      confirm: "",
      terms: false,
    },
  });
  return (
    <FormProvider {...form}>
      <section className="mx-auto grid grid-cols-1 space-y-8 p-4 md:max-w-140 md:px-0 lg:max-w-280 lg:mt-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-4 xl:px-0">
        <div className="@container">
          <section className="uppercase">
            <LogoIcon />
            <h1 className="font-heading text-preset-1 leading-preset-1 mt-10 mb-3 font-extrabold">
              <span className="text-app-lime-500">//</span>Join the <br />
              nexus{" "}
            </h1>
            <p className="text-preset-6 tracking-preset-widest text-app-neutral-300 font-mono font-normal">
              Initialize your NEONCORE identity
            </p>
            <Separator className="bg-app-neutral-700 mt-7 mb-5 lg:mt-14" />
          </section>
          <FormStatus />
        </div>

        <div className="@container relative">
          <span
            aria-hidden
            className="border-app-lime-500 pointer-events-none absolute -top-px -left-px size-6 border-t-2 border-l-2"
          />

          <span
            aria-hidden
            className="border-app-lime-500 pointer-events-none absolute -right-px -bottom-px size-6 border-r-2 border-b-2"
          />
          <section className="border-app-neutral-700 bg-app-neutral-900 border px-5 py-8">
            <SignupForm />
          </section>
        </div>
      </section>
    </FormProvider>
  );
};
export default FormWrapper;
