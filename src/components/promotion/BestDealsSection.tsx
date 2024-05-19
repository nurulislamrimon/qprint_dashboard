"use client";
import React, { useLayoutEffect, useState } from "react";
import ChooseColorOrImage from "./card/ChooseColorOrImage";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonSecondary from "../ui/btn/ButtonSecondary";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import BottomModal from "./BottomModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setBestDeals,
  setBestDealsFiles,
} from "@/store/features/bestDeals/bestDealsSlice";
import {
  useAddBestDealsMutation,
  useGetBestDealsQuery,
} from "@/store/features/bestDeals/bestDealsApi";
import { toast } from "react-toastify";
import SearchProductModal from "./SearchProductModal";
import ProductSmallCard from "./card/ProductSmallCard";
import Loader from "../shared/loaders/Loader";
import FileUploader from "../shared/FileUploader/FileUploader";

const BestDealsSection = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useGetBestDealsQuery("");
  const [addBestDeals] = useAddBestDealsMutation();
  const [showBottomModal, setShowBottomModal] = useState(false);
  // get search data
  const dispatch = useAppDispatch();
  const bestDeals = useAppSelector((state) => state.bestDealsSlice);
  console.log(bestDeals);
  const formData = new FormData();

  useLayoutEffect(() => {
    dispatch(setBestDeals(data?.data));
  }, [data, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target?.name;

    if (e.target instanceof HTMLInputElement && e.target?.files) {
      const files = e.target?.files;
      if (files && files.length) {
        const objUrl = URL.createObjectURL(files[0]);

        dispatch(setBestDeals({ [fieldName]: objUrl }));
        dispatch(setBestDealsFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value = e.target.value;
      dispatch(setBestDeals({ [fieldName]: value }));
    }
  };

  const toggleBottomModal = () => {
    setShowBottomModal((prevState) => !prevState);
  };

  // const formatDate = (date: Date): string => {
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${month}/${day}/${year}`;
  // };

  // handle submit

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    formData.append("title", bestDeals.title);
    formData.append("description", bestDeals.description);
    formData.append("endDate", bestDeals.endDate);
    formData.append("startDate", bestDeals.startDate);

    if (bestDeals?.backgroundColor !== "") {
      formData.append("backgroundColor", bestDeals.backgroundColor);
      formData.append("backgroundPhoto", "");
    } else {
      formData.append(
        "backgroundPhoto",
        bestDeals?.bestDealsFiles?.backgroundPhoto
      );
      formData.append("backgroundColor", "");
    }

    if (bestDeals?.bestDealsFiles?.firstProductPhoto) {
      formData.append(
        "firstProductPhoto",
        bestDeals.bestDealsFiles.firstProductPhoto
      );
    }
    if (bestDeals?.bestDealsFiles?.secondProductPhoto) {
      formData.append(
        "secondProductPhoto",
        bestDeals.bestDealsFiles.secondProductPhoto
      );
    }

    // Append products individually
    (bestDeals?.products as any[]).forEach((product) => {
      formData.append("products", JSON.stringify(product));
    });
    try {
      const res = await addBestDeals(formData);
      console.log(res);

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
      className={`bg-white w-full h-[calc(100vh-90px)] mt-1 md:p-7 p-5 overflow-y-auto  ${
        loading && "overflow-hidden relative"
      }`}
    >
      {loading && <Loader />}
      <h3 className="text-black-opacity-60 text-lg">Add New Best Deal</h3>

      <form onSubmit={handleSubmit}>
        {/* slider design start */}
        <div className="flex items-center lg:flex-row flex-col lg:justify-center justify-start lg:gap-28  gap-0  ">
          <div className="lg:w-8/12 w-full">
            <ChooseColorOrImage handleChange={handleChange} />
          </div>
          <div className="flex gap-5">
            <FileUploader
              name="firstProductPhoto"
              className="min-h-48  h-full min-w-48 w-auto relative cursor-pointer border border-dashed border-black-opacity-20 flex items-center justify-center text-black-opacity-60 text-xs "
              data={bestDeals}
              multiple={true}
              onChange={handleChange}
              accept="image/jpg,image/jpeg,image/png"
              maxSize={2}
              bottomText="Add First Photo"
            ></FileUploader>
            <FileUploader
              name="secondProductPhoto"
              className="min-h-48  h-full min-w-48 w-auto relative cursor-pointer border border-dashed border-black-opacity-20 flex items-center justify-center text-black-opacity-60 text-xs "
              data={bestDeals}
              multiple={true}
              onChange={handleChange}
              accept="image/jpg,image/jpeg,image/png"
              maxSize={2}
              bottomText="Add Second Photo"
            ></FileUploader>
          </div>
        </div>
        {/* slider design end */}

        <div className="flex items-center justify-center  gap-5 md:flex-row flex-col mt-10 overflow-x-scroll ">
          <CustomGlobalInput
            label="Title"
            type="text"
            placeholder="Type here"
            value={bestDeals?.title}
            name="title"
            onChange={handleChange}
          />
          <CustomGlobalInput
            label="Start Date"
            type="date"
            placeholder="Type here"
            value={bestDeals?.startDate}
            name="startDate"
            onChange={(e) =>
              dispatch(setBestDeals({ [e.target.name]: e.target.value }))
            }
          />
          <CustomGlobalInput
            label="End Date"
            type="date"
            placeholder="Type here"
            value={bestDeals?.endDate}
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
            value={bestDeals?.description}
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
          {bestDeals?.searchProduct ? (
            <div className="absolute -top-[380px] w-full">
              <SearchProductModal data={bestDeals?.searchProduct} />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* selected product card */}

        {/* we will use only one card from here */}

        <div className="flex items-center justify-start gap-4 mt-2 overflow-x-auto w-full">
          {bestDeals?.products?.map((product: any, index: number) => (
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
