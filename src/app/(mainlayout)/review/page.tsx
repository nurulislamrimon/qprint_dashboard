"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Review = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`review/all-review`);
  }, [router]);

  return null;
};

export default Review;
