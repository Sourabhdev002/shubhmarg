import type { ResolvedDarshan } from "@/lib/darshan";
import Image from "next/image";

/**
 * Full-bleed weekday deity image fixed behind the page.
 *
 * Pure server component (no "use client", no hooks, zero client JS). Renders a
 * single fixed, non-interactive layer with one `next/image`. The `fixed`
 * positioning on the parent satisfies next/image `fill`'s positioned-parent
 * requirement. Never uses background-attachment, will-change, transform or any
 * scroll/parallax behaviour, so there is nothing for reduced-motion to disable.
 *
 * The image is the LCP element, so `priority` is set to preload it.
 */
export default function DarshanBackdrop({
  darshan,
}: {
  darshan: ResolvedDarshan | null;
}) {
  if (darshan === null) {
    return null;
  }

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <Image
        src={darshan.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
