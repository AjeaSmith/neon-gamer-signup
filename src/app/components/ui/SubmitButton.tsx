import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const SubmitButton = ({
  isSubmitting,
  className,
}: {
  isSubmitting?: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        "text-preset-5 leading-preset-5 tracking-preset-widest hover:bg-app-neutral-50 hover:shadow-button-hover focus:ring-app-lime-500 focus:ring-offset-app-lime-500 mt-4 w-full cursor-pointer py-4.5 font-bold uppercase hover:border-none focus:border-2 focus:ring", // Base styles
        isSubmitting
          ? "border-app-lime-500 bg-app-neutral-900 text-app-lime-500 border font-bold hover:text-red-500"
          : "border-app-neutral-950 bg-app-lime-500 text-app-neutral-950",
        className,
      )}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Transmitting_" : "Initialize account"}
    </Button>
  );
};
export default SubmitButton;
