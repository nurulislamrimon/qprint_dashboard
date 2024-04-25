"use client";
import React, { useLayoutEffect, useState } from "react";
import ChooseColorOrImage from "./card/ChooseColorOrImage";
import FileInput from "../ui/FileInput";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonSecondary from "../ui/btn/ButtonSecondary";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import BottomModal from "./BottomModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBestDeals } from "@/store/features/bestDeals/bestDealsSlice";
import {
  useAddBestDealsMutation,
  useGetBestDealsQuery,
} from "@/store/features/bestDeals/bestDealsApi";
import { toast } from "react-toastify";
import SearchProductModal from "./SearchProductModal";
import ProductSmallCard from "./card/ProductSmallCard";

const BestDealsSection = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useGetBestDealsQuery("");
  const [addBestDeals] = useAddBestDealsMutation();
  const [showBottomModal, setShowBottomModal] = useState(false);
  // get search data
  const dispatch = useAppDispatch();
  const {
    title,
    description,
    startDate,
    endDate,
    backgroundColor,
    searchProduct,
    products,
  } = useAppSelector((state) => state.bestDealsSlice);

  const formData = new FormData();

  useLayoutEffect(() => {
    dispatch(setBestDeals(data?.data));
  }, [data, dispatch]);

  const toggleBottomModal = () => {
    setShowBottomModal((prevState) => !prevState);
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append("title", title as string);
    formData.append("description", description as string);
    formData.append("startDate", startDate as string);
    formData.append("endDate", endDate as string);
    formData.append("backgroundColor", backgroundColor as string);

    setLoading(true);

    // Append products individually
    (products as any[]).forEach((product) => {
      formData.append("products", JSON.stringify(product));
    });
    try {
      const res = await addBestDeals(formData);

      if (res && "data" in res) {
        toast.success(res.data.message);
        toggleBottomModal();
      }
      if (res && "error" in res) {
        toast.error(res.error as unknown as string);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        loading
          ? "opacity-90 pointer-events-none"
          : "bg-white w-full h-[calc(100vh-90px)] mt-1 md:p-7 p-5 overflow-y-auto "
      }
    >
      <h3 className="text-black-opacity-60 text-lg">Add New Best Deal</h3>

      <form onSubmit={handleSubmit}>
        {/* slider design start */}
        <div className="flex items-center lg:flex-row flex-col lg:justify-center justify-start lg:gap-28  gap-0  ">
          <div className="lg:w-8/12 w-full">
            <ChooseColorOrImage />
          </div>
          <div className="flex gap-5">
            <FileInput
              name="firstProductPhoto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target?.files?.length) {
                  formData.append(e.target.name, e.target?.files[0]);
                  // create image url using file value
                  const reader = URL.createObjectURL(e.target?.files[0]);
                }
              }}
              imageBottomText="Size :  320px to 280px"
            />
            <FileInput
              name="secondProductPhoto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target?.files?.length) {
                  formData.append(e.target.name, e.target?.files[0]);
                  // create image url using file value
                  const reader = URL.createObjectURL(e.target?.files[0]);
                }
              }}
              imageBottomText="Size :  320px to 280px"
            />
          </div>
        </div>
        {/* slider design end */}

        <div className="flex items-center justify-center  gap-5 md:flex-row flex-col mt-10 overflow-x-scroll ">
          <CustomGlobalInput
            label="Title"
            type="text"
            placeholder="Type here"
            value={title}
            name="title"
            onChange={(e) =>
              dispatch(setBestDeals({ [e.target.name]: e.target.value }))
            }
          />
          <CustomGlobalInput
            label="Start Date"
            type="date"
            placeholder="Type here"
            value={startDate}
            name="startDate"
            onChange={(e) =>
              dispatch(setBestDeals({ [e.target.name]: e.target.value }))
            }
          />
          <CustomGlobalInput
            label="End Date"
            type="date"
            placeholder="Type here"
            value={endDate}
            name="endDate"
            onChange={(e) =>
              dispatch(setBestDeals({ [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex items-center justify-center  gap-5 md:flex-row flex-col mt-10 ">
          <CustomGlobalInput
            label="Description"
            type="textarea"
            placeholder="Type here"
            textareaLength={170}
            value={description}
            name="description"
            onChange={(e) =>
              dispatch(setBestDeals({ [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center  gap-5 md:flex-row flex-col mt-10 ">
            <CustomGlobalInput
              name="searchProduct"
              label="Products list"
              type="text"
              placeholder="Search Product"
              textareaLength={170}
              onChange={(e) =>
                dispatch(setBestDeals({ searchProduct: e.target.value }))
              }
            />
          </div>
          {searchProduct ? (
            <div className="absolute -top-[380px] w-full">
              <SearchProductModal data={searchProduct} />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* selected product card */}

        {/* we will use only one card from here */}

        <div className="flex items-center justify-start gap-4 mt-2 overflow-x-auto w-full">
          {products?.map((product: any, index: number) => (
            <ProductSmallCard key={index} data={product} />
          ))}
        </div>

        <div className="w-full flex  items-center justify-center gap-5 my-16 ">
          <ButtonSecondary
            buttonText="Preview"
            type="reset"
            onClick={toggleBottomModal}
          />
          <ButtonPrimary
            type="submit"
            buttonText={loading ? "Submiting" : "Submit"}
          />
        </div>
      </form>

      {/* show modal from here */}
      {showBottomModal && <BottomModal toggleBottomModal={toggleBottomModal} />}
    </div>
  );
};

export default BestDealsSection;
