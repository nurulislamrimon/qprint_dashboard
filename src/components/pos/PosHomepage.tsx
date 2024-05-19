"use client";
import { IconSearch } from "@tabler/icons-react";
import {
  useProductsQuery,
  useSearchProductQuery,
} from "@/store/features/product/productApi";
import { useCategoriesQuery } from "@/store/features/category/categoryApi";
import { IProduct } from "@/types";
import ProductCard from "./ProductCard";
import PosCategoryCard from "./PosCategoryCard";
import PosCartCard from "./PosCartCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setBestDeals,
  setSearchProductEmpty,
} from "@/store/features/bestDeals/bestDealsSlice";
import CardSkeleton from "../shared/skeleton/CardSkeleton";

import ProductEmptyState from "./ProductEmptyState";
import { useState } from "react";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";

const PosHomepage = () => {
  const { searchProduct } = useAppSelector((state) => state.bestDealsSlice);
  const { searchProductByCategory } = useAppSelector(
    (state) => state.searchProductByCategorySlice
  );
  const [page, setPage] = useState(10);
  const { data, isLoading } = useProductsQuery("");
  const { data: category } = useCategoriesQuery();
  const dispatch = useAppDispatch();
  const { data: products, isLoading: productLoading } = useSearchProductQuery(
    `searchTerm=${searchProduct ? searchProduct : " "}&${
      searchProductByCategory
        ? `category.categoryName=${searchProductByCategory}`
        : ""
    }&limit=${page}`
  );

  // Load More Product Handler
  const loadMoreProducts = () => {
    setPage((prevValue) => (prevValue += 10));
  };

  return (
    <div className="bg-body-main-bg-color grid grid-cols-1 md:grid-cols-4  gap-1 h-[calc(100vh-90px)] overflow-y-auto w-full overflow-hidden  mt-1">
      <div className="bg-white md:px-5 md:py-7 p-5 flex flex-col gap-[30px] md:col-span-3 ">
        <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-10 gap-5">
          <div className="flex gap-2.5">
            <span className="text-black md:text-lg text-base font-medium whitespace-nowrap">
              Choose Category
            </span>
            <div
              className={`${
                isLoading && "animate-ping"
              } bg-green-opacity-10 flex items-center justify-center  rounded-full w-7 h-7 p-1 text-green-color  text-[10px]`}
            >
              {category?.data?.length}
            </div>
          </div>
          <PosCategoryCard />
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="border px-3 py-2.5 rounded-[5px] text-black flex items-center gap-2.5">
            <IconSearch stroke={1} />
            <input
              type="text"
              className="outline-none w-full text-black"
              placeholder="Search Product"
              name="productSearch"
              onChange={(e) => {
                const inputValue = e.target.value.trim();
                if (inputValue === "") {
                  dispatch(setSearchProductEmpty());
                } else {
                  dispatch(setBestDeals({ searchProduct: inputValue }));
                }
              }}
            />
          </div>
          <div className="h-[calc(100vh-300px)] overflow-y-auto">
            {products?.data?.length === 0 ? (
              <ProductEmptyState message="Sorry this product is not available." />
            ) : (
              <div className="pos-product-cards-container-custom-grid">
                {productLoading
                  ? Array.from({ length: 15 }).map((_, index) => (
                      <CardSkeleton key={index} />
                    ))
                  : products?.data?.map((product: IProduct, i: number) => (
                      <ProductCard
                        key={i}
                        product={product}
                        isLoading={isLoading}
                      />
                    ))}
              </div>
            )}
            <div className="flex items-center justify-center mt-5">
              <div onClick={() => loadMoreProducts()}>
                <ButtonPrimary type="submit" buttonText="Load More" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pos cart  */}
      <div className="shrink-0">
        <PosCartCard />
      </div>
    </div>
  );
};

export default PosHomepage;
