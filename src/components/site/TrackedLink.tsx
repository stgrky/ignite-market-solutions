"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

type Props = {
  href: string;
  event: string;
  params?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
};

/**
 * A link that reports itself to GA before it leaves.
 *
 * Built because two of the four things we count as a conversion — someone
 * clicking the phone number and someone clicking the email address — fired
 * no event at all. A `tel:` or `mailto:` hands the visitor to another
 * application and the page is left behind, so if the click is not recorded
 * at the moment it happens it is never recorded, and the conversion looks
 * like it did not occur. The site has been under-reporting its own results.
 *
 * `tel:`, `mailto:` and `sms:` are real navigations out of the app, so they
 * use a plain anchor; everything internal goes through next/link so the
 * route is still prefetched.
 */
export function TrackedLink({ href, event, params, className, children }: Props) {
  const track = () => sendGAEvent("event", event, params ?? {});
  const external = /^(tel:|mailto:|sms:|https?:)/.test(href);

  if (external) {
    return (
      <a href={href} onClick={track} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={track} className={className}>
      {children}
    </Link>
  );
}
