import { cn } from "@/lib/utils";

interface FeltonLogoProps {
  className?: string; // Container className
  textClassName?: string; // Text specific changes
  lineClassName?: string; // Line specific changes
}

export function FeltonLogo({
  className,
  textClassName,
  lineClassName,
}: FeltonLogoProps) {
  return (
    <div
      className={cn(
        "text-center flex flex-col items-center justify-center",
        className,
      )}
    >
      <span
        className={cn(
          "felton-text font-semibold tracking-widest leading-none block",
          textClassName,
        )}
      >
        FELTON
      </span>
      <div className={cn("felton-line w-3/4 mx-auto", lineClassName)}></div>
    </div>
  );
}
