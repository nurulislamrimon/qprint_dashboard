"use client";
import { reviewNavigation } from "@/constants/review.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ReviewNavigationBarProps {
  key?: string;
  label?: string;
  href: string | undefined;
}

const ReviewNavigationBar = () => {
  const pathName = usePathname();

  return (
    <div className="flex items-center gap-10 px-4 md:px-6 lg:px-7 overflow-x-auto">
      {reviewNavigation.map(
        ({ key, label, href }: ReviewNavigationBarProps) => (
          <div key={key} className="py-2.5">
            <Link
              href={`/review${href}`}
              className={`${
                pathName === `/review${href}`
                  ? "border-b main-text-color border-fuchsia-700"
                  : "pb-2.5 w-full shrink-0 overflow-scroll text-nowrap"
              }`}
            >
              {label}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewNavigationBar;
