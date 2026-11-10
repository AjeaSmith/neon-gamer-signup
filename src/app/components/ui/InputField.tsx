'use client";';
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CaretRightIcon } from "@phosphor-icons/react";
import EyeIcon from "../icons/Eye";
import CheckIcon from "../icons/Check";
import AlertIcon from "../icons/Alert";
import { useState } from "react";
import PasswordStrengthMeter from "./PasswordStrength";
import {
  getPasswordStrength,
  STRENGTH_LABELS,
  TEXT_COLORS,
} from "@/lib/passwordStrength";
import { SignupValues } from "@/schema";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "cn";
import EyeOffIcon from "../icons/EyeOff";
const InputField = ({
  field,
  fieldState,
  label,
  helperText,
  placeholder,
  type,
}: {
  field: any;
  fieldState: any;
  label: string;
  helperText?: string;
  placeholder?: string;
  type?: string;
}) => {
  const [fieldType, setFieldType] = useState(type);
  const [canSee, setCanSee] = useState(false);

  const { control } = useFormContext<SignupValues>();
  const password = useWatch({ control, name: "password" });
  const passwordStrength = getPasswordStrength(password);

  function switchType() {
    setFieldType(fieldType === "password" ? "text" : "password");
    setCanSee((prev) => !prev);
  }

  return (
    <Field>
      <FieldLabel
        className="tracking-preset-widest text-app-neutral-300 mb-1 uppercase"
        htmlFor={label}
      >
        <CaretRightIcon className="text-app-lime-500" />
        {label}
      </FieldLabel>
      <InputGroup className="hover:border-app-neutral-50 border-app-neutral-500 bg-app-neutral-950 dark:bg-app-neutral-900 has-[[data-slot=input-group-control]:focus-visible]:border-app-lime-500 has-[[data-slot=input-group-control]:focus-visible]:outline-app-lime-500 has-[[data-slot=input-group-control][aria-invalid=true]]:border-app-red :has-[[data-slot=input-group-control][aria-invalid=true]]:ring-1 has-[[data-slot=input-group-control][aria-invalid=true]]:ring-app-red h-12 rounded-none border shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:outline-offset-3 has-[[data-slot=input-group-control]:focus-visible]:outline-solid">
        <InputGroupInput
          aria-invalid={fieldState.invalid}
          id={label}
          {...field}
          type={fieldType}
          autoComplete="off"
          placeholder={placeholder}
          className="tracking-preset-wide px-4 font-mono text-base text-slate-200 placeholder:text-slate-500"
        />
        {!fieldState.invalid && fieldState.isTouched && (
          <InputGroupAddon align="inline-end">
            <CheckIcon />
          </InputGroupAddon>
        )}
        {field.name === "password" && (
          <InputGroupAddon
            className="mr-1 cursor-pointer"
            align="inline-end"
            onClick={switchType}
          >
            {!canSee ? <EyeIcon /> : <EyeOffIcon />}
          </InputGroupAddon>
        )}
        {field.name === "confirm" && (
          <InputGroupAddon
            className="mr-1 cursor-pointer"
            align="inline-end"
            onClick={switchType}
          >
            {!canSee ? <EyeIcon /> : <EyeOffIcon />}
          </InputGroupAddon>
        )}
      </InputGroup>

      {field.name === "password" && <PasswordStrengthMeter />}
      {helperText && !fieldState.invalid && (
        <FieldDescription className="text-preset-7 text-app-neutral-400 flex justify-between">
          {helperText}

          {field.name === "password" && (
            <span
              className={cn(
                "tracking-preset-widest uppercase",
                TEXT_COLORS[passwordStrength],
              )}
            >
              {STRENGTH_LABELS[passwordStrength] || null}
            </span>
          )}
        </FieldDescription>
      )}
      {fieldState.invalid && (
        <p className="text-preset-7 text-app-red flex gap-2">
          <AlertIcon />
          {fieldState.error?.message}
        </p>
      )}
    </Field>
  );
};
export default InputField;
