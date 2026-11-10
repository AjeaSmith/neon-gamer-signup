"use client";
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

import InputField from "./InputField";

import { Checkbox } from "@/components/ui/checkbox";
import AlertIcon from "../icons/Alert";
import { Separator } from "@/components/ui/separator";
import SubmitButton from "./SubmitButton";
import { SignupValues } from "@/schema";
import SuccessPage from "./SuccessPage";
import { postFormData } from "@/app/actions";
import { useState } from "react";

export default function SignupForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { control, handleSubmit } = useFormContext<SignupValues>();

  const { isSubmitting } = useFormState({ control });
  const callsign = useWatch({ control, name: "callsign" });

  async function onSubmit(data: SignupValues) {
    try {
      const res = await postFormData(data);
      if (!res.success) return alert(res.error);
      if (res.success) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error);
    }
  }
  return (
    <section>
      {showSuccess ? (
        <SuccessPage callsign={callsign} setShowSuccess={setShowSuccess} />
      ) : (
        <FieldSet>
          <h2 className="tracking-preset-widest text-preset-6 flex justify-between uppercase">
            New Operator
            <span className="text-app-neutral-400">All fields required</span>
          </h2>
          <Separator className="bg-app-neutral-700 mb-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-1">
              <Controller
                name="callsign"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    type="text"
                    field={field}
                    fieldState={fieldState}
                    label="Callsign"
                    helperText="3–20 characters: letters, numbers, _ or -"
                    placeholder="e.g. Vortex_07"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    type="email"
                    field={field}
                    fieldState={fieldState}
                    label="Email"
                    placeholder="you@example.com"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    type="password"
                    field={field}
                    fieldState={fieldState}
                    label="Password"
                    helperText="At least 8 characters"
                  />
                )}
              />
              <Controller
                name="confirm"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    type="password"
                    field={field}
                    fieldState={fieldState}
                    label="Confirm Password"
                  />
                )}
              />
              <Controller
                name="terms"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Field
                      className="-mb-3"
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        onBlur={field.onBlur}
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        className="bg-app-neutral-950 data-[state=checked]:border-app-lime-500 data-[state=checked]:bg-app-lime-500 aria-invalid:border-app-red aria-invalid:focus-visible:outline-app-red data-[state=checked]:aria-invalid:border-app-red data-[state=checked]:aria-invalid:bg-app-red size-5 shadow-none aria-invalid:ring-0"
                      />
                      <FieldLabel
                        className="text-app-neutral-300"
                        htmlFor="terms"
                      >
                        I accept the{" "}
                        <span className="hover:text-app-neutral-50 text-app-lime-500 cursor-pointer border-b border-dotted">
                          Terms
                        </span>{" "}
                        and{" "}
                        <span className="hover:text-app-neutral-50 text-app-lime-500 cursor-pointer border-b border-dotted">
                          Privacy Policy.
                        </span>
                      </FieldLabel>
                    </Field>
                    {fieldState.invalid && (
                      <p
                        role="alert"
                        className="text-preset-7 text-app-red flex gap-2"
                      >
                        <AlertIcon />
                        Accept the terms to continue
                      </p>
                    )}
                  </>
                )}
              />
              <SubmitButton isSubmitting={isSubmitting} />
              <p className="text-preset-5 text-app-neutral-300 text-center">
                Already an operator?{" "}
                <span className="hover:text-app-neutral-50 text-app-lime-500 cursor-pointer border-b border-dotted">
                  Log in
                </span>
              </p>
            </FieldGroup>
          </form>
        </FieldSet>
      )}
    </section>
  );
}
