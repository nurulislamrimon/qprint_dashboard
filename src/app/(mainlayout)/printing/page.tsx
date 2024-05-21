"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Printing = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/printing/all-printing-request`);
  }, [router]);
  return null;
};

export default Printing;
