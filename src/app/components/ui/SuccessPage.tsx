"use client";
import { Button } from "@/components/ui/button";
import HexCheck from "../icons/HexCheck";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { SignupValues } from "@/schema";

const SuccessPage = ({
  callsign,
  setShowSuccess,
}: {
  callsign: string;
  setShowSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  function handleReset() {
    setShowSuccess(false);
    reset();
  }
  const { reset } = useFormContext<SignupValues>();
  return (
    <section className="flex h-[45vh] flex-col gap-4 px-4 md:h-[68vh] md:justify-center lg:h-[80vh]">
      <HexCheck />
      <h1 className="font-heading text-preset-2 leading-preset-2 tracking-preset-wide font-extrabold uppercase">
        <span className="text-app-lime-500">//</span> handshake complete
      </h1>
      <p className="text-app-neutral-300 text-preset-4 leading-preset-4">
        Operator <span className="text-app-lime-500">{callsign} </span>
        provisioned. Your account is ready.
      </p>
      <Button
        type="button"
        onClick={handleReset}
        className="text-preset-5 tracking-preset-wide w-fulll text-app-neutral-950 bg-app-lime-500 cursor-pointer py-3 text-center font-semibold uppercase"
      >
        Continue to log in
      </Button>
    </section>
  );
};
export default SuccessPage;
