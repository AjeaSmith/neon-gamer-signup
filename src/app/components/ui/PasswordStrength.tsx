"use client";
import {
  COLORS,
  getPasswordStrength,
  STRENGTH_LABELS,
} from "@/lib/passwordStrength";
import { SignupValues } from "@/schema";
import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";

const PasswordStrengthMeter = () => {
  const { control } = useFormContext<SignupValues>();
  const password = useWatch({ control, name: "password" });
  const strength = getPasswordStrength(password);

  return (
    <>
      <div
        role="progressbar"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={strength}
        aria-valuetext={STRENGTH_LABELS[strength] || "No password"}
        className="flex gap-1"
      >
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 transition-colors ${
              level <= strength ? COLORS[strength] : "bg-app-neutral-700"
            }`}
          />
        ))}
      </div>
    </>
  );
};
export default PasswordStrengthMeter;
