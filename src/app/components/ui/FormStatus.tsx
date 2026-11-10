"use client";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { signupSchema, SignupValues } from "@/schema";
import { cn } from "@/lib/utils";

const FormStatus = () => {
  const { control } = useFormContext<SignupValues>();

  const { errors } = useFormState({ control });

  const watchCallsign = useWatch({ control, name: "callsign" });
  const watchEmail = useWatch({ control, name: "email" });
  const watchPassword = useWatch({ control, name: "password" });
  const watchConfirm = useWatch({ control, name: "confirm" });
  const watchTerms = useWatch({ control, name: "terms" });

  const isCallsignReady =
    signupSchema.shape.callsign.safeParse(watchCallsign).success;
  const isEmailReady = signupSchema.shape.email.safeParse(watchEmail).success;
  const isPasswordReady =
    signupSchema.shape.password.safeParse(watchPassword).success;
  const isTermsReady = signupSchema.shape.terms.safeParse(watchTerms).success;

  const isConfirmReady = watchConfirm !== "" && watchConfirm === watchPassword;

  const allChecks = [
    isCallsignReady,
    isEmailReady,
    isPasswordReady,
    isConfirmReady,
    isTermsReady,
  ];

  const readyCount = allChecks.filter(Boolean).length;
  const operatorId = isCallsignReady ? watchCallsign : "Unassigned";

  return (
    <section className="w-full font-bold uppercase">
      <div className="text-preset-6 lg:flex lg:justify-between">
        <p className="tracking-preset-widest text-app-neutral-400 flex items-center justify-between font-normal md:justify-start md:gap-4 lg:flex-col lg:items-start lg:gap-2">
          Operator ID
          <span className="text-app-neutral-100 lg:font-heading lg:text-preset-2 lg:tracking-preset-wide lg:mb-3 lg:font-bold">
            {operatorId}
          </span>
        </p>
        <p
          className={cn(
            "tracking-preset-widest text-app-neutral-400 hidden font-normal lg:block",
            readyCount === 5 && "text-app-lime-500",
          )}
        >
          {readyCount}/5 ready
        </p>
      </div>
      <ul className="text-preset-6 tracking-preset-widest hidden space-y-1.5 font-normal lg:block">
        <li className="flex items-center gap-4">
          <span className="text-app-neutral-300">callsign</span>

          <span className="border-app-neutral-600 flex-1 border-t border-dotted" />

          {errors.callsign?.message && (
            <span className="text-app-red">too short</span>
          )}

          {isCallsignReady && <span>ok</span>}

          {!errors.callsign?.message && !isCallsignReady && (
            <span className="text-app-neutral-400">pending</span>
          )}
        </li>
        <li className="flex items-center gap-4">
          <span className="text-app-neutral-300">email</span>
          <span className="border-app-neutral-600 flex-1 border-t border-dotted" />
          {errors.email?.message && (
            <span className="text-app-red">malformed</span>
          )}

          {isEmailReady && <span>ok</span>}

          {!errors.email?.message && !isEmailReady && (
            <span className="text-app-neutral-400">pending</span>
          )}
        </li>
        <li className="flex items-center gap-4">
          <span className="text-app-neutral-300">password</span>
          <span className="border-app-neutral-600 flex-1 border-t border-dotted" />
          {errors.password?.message && (
            <span className="text-app-red">too short</span>
          )}

          {isPasswordReady && <span>ok</span>}

          {!errors.password?.message && !isPasswordReady && (
            <span className="text-app-neutral-400">pending</span>
          )}
        </li>
        <li className="flex items-center gap-4">
          <span className="text-app-neutral-300">confirm</span>
          <span className="border-app-neutral-600 flex-1 border-t border-dotted" />
          {errors.confirm?.message && (
            <span className="text-app-red">mismatch</span>
          )}

          {isConfirmReady && <span>ok</span>}

          {!errors.confirm?.message && !isConfirmReady && (
            <span className="text-app-neutral-400">pending</span>
          )}
        </li>
        <li className="flex items-center gap-4">
          <span className="text-app-neutral-300">terms</span>
          <span className="border-app-neutral-600 flex-1 border-t border-dotted" />
          {errors.terms?.message && (
            <span className="text-app-red">required</span>
          )}

          {isTermsReady && <span>ok</span>}

          {!errors.terms?.message && !isTermsReady && (
            <span className="text-app-neutral-400">pending</span>
          )}
        </li>
      </ul>
    </section>
  );
};
export default FormStatus;
