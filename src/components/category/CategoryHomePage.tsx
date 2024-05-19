"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import SubCategory from "./SubCategory";
import AddSubCategoryDrawer from "./AddSubCategoryDrawer";
import { useCategoriesQuery } from "@/store/features/category/categoryApi";
import { useAppSelector } from "@/store/hook";
import CategorySkeleton from "../shared/skeleton/CategorySkeleton";
import MainCategoryItem from "./MainCategoryItem";

export type Category = {
  _id: string;
  categoryName?: string;
  categoryPhoto?: string;
  categoryIcon?: string;
  subcategories?: Category;
};

const CategoryHomePage = () => {
  const { data, isLoading } = useCategoriesQuery();
  const { _id, subcategories } = useAppSelector(
    (state) => state.subCategoryPropsSlice
  );

  // drawer handle
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleCloseDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (!container) return;
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [containerRef]);
  return (
    <div className="mt-1 bg-white md:px-5 md:py-7 px-3 py-5 h-[calc(100vh-90px)] overflow-y-auto grid grid-cols-1 gap-7 md:grid-cols-4">
      <div className="md:border-r md:border-b-0 border-b flex flex-col gap-[30px]">
        <div className="md:flex items-center gap-2.5 hidden">
          <span className="text-lg font-medium">Main Category</span>
          <div
            className={`rounded-full bg-gray-opacity-10 flex items-center justify-center w-7 h-7 text-custom-10px ${
              isLoading && "animate-ping"
            }`}
          >
            {data?.meta?.total}
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex md:flex-col flex-row  overflow-x-auto gap-5 pr-5"
        >
          {isLoading
            ? [...Array(14)].map((_, index) => {
                return <CategorySkeleton key={index} />;
              })
            : data?.data?.map((data: Category) => (
                <MainCategoryItem
                  key={data?._id}
                  data={data}
                  isLoading={isLoading}
                />
              ))}
        </div>
      </div>
      <div className="md:px-7 ">
        <span className="text-lg font-medium">Sub Category</span>
        <div className="flex flex-col mt-[30px]">
          <div className="flex flex-col gap-3.5 pb-3.5">
            {subcategories?.map((subCategory: any) => (
              <SubCategory key={subCategory?._id} data={subCategory} id={_id} />
            ))}
          </div>

          {Object.keys(subcategories).length ? (
            <button
              onClick={() => setOpenDrawer(true)}
              className="flex items-center gap-2.5 text-base main-text-color mt-3.5 border-t pt-2 "
            >
              <IconPlus stroke={1} className="text-fuchsia-800" />
              Sub Category
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {openDrawer && (
        <AddSubCategoryDrawer id={_id} handleModal={handleCloseDrawer} />
      )}
    </div>
  );
};

export default CategoryHomePage;
