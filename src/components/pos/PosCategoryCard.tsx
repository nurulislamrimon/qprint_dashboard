import { useCategoriesQuery } from "@/store/features/category/categoryApi";
import React, { useEffect, useRef } from "react";
import { Category } from "../category/CategoryHomePage";
import ProductCategory from "./Product-Category";
import ProductCategorySkeleton from "../shared/skeleton/ProductCategorySkeleton";

const PosCategoryCard = () => {
  const { data, isLoading } = useCategoriesQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (!container) return;
      container.scrollLeft += e.deltaY;
      e.preventDefault(); // Prevent default behavior (page scrolling)
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} className="flex items-center gap-5 overflow-x-auto ">
      {
        isLoading ? (
          [...Array(10)].map((_, index) => {
            return (

              <ProductCategorySkeleton key={index} />
            )
          })
        ) :

          data?.data?.map((category: Category) => (
            <ProductCategory isLoading={isLoading} key={category._id} categoryData={category} />
          ))}
    </div>
  );
};

export default PosCategoryCard;
