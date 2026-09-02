import { type HTMLAttributes } from "react";

export function Container({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  // A caller's own max-w-* can't beat the default just by being appended —
  // both land at the same specificity, so the winner is whichever Tailwind
  // emits later, which was max-w-6xl. Reading pages that asked for max-w-3xl
  // were rendering at 1088px instead. Drop the default when one is supplied.
  const hasMaxWidth = /(^|\s)!?max-w-/.test(className);

  return (
    <div
      className={`mx-auto w-full ${hasMaxWidth ? "" : "max-w-6xl"} px-6 sm:px-8 ${className}`
        .replace(/\s+/g, " ")
        .trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
