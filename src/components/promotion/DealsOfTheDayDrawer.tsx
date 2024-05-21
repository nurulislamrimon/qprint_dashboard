import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { useAppDispatch } from "@/store/hook";
import { useAddDealsOfTheDayAndWidgetMutation } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../shared/loaders/Loader";
import {
  resetDealsOfTheDay,
  resetProduct,
  setDealsOfTheDay,
  setDealsOfTheDayFiles,
} from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDaySlice";
import DealsOfTheDayCard from "./card/DealsOfTheDayCard";
import DealsOfTheDayProductSearch from "./DealsOfTheDayProductSearch";
import { tr } from "date-fns/locale";
import Image from "next/image";
import { mainUrl } from "@/constants/mainUrl";
import { IconX } from "@tabler/icons-react";
const DealsOfTheDayDrawer = ({ data }: any) => {
  const [addDeals, { isLoading: loading }] =
    useAddDealsOfTheDayAndWidgetMutation();
  const dispatch = useAppDispatch();
  const formData = new FormData();

  console.log(data);

  // handle image and input

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

        dispatch(setDealsOfTheDay({ [fieldName]: objUrl }));
        dispatch(setDealsOfTheDayFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value = e.target.value;
      dispatch(setDealsOfTheDay({ [fieldName]: value }));
    }
  };

  // handle submit

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append(data.fieldName, JSON.stringify(data));
    if (data?.dealsOfThedayFile?.productPhoto !== undefined) {
      formData.append(
        `${data.fieldName}.productPhoto`,
        data.dealsOfThedayFile.productPhoto
      );
    }

    try {
      const res = await addDeals(formData);
      console.log(res);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setDealsOfTheDay(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomGlobalDrawer
        childrenClassName="overflow-y-scroll"
        modalWidthControlClassName="w-full md:w-[500px]"
        isVisible={Object.keys(data).length ? true : false}
      >
        {/* main container */}
        <div className={`p-5 overflow-y-auto  ${loading && "overflow-hidden"}`}>
          {loading && <Loader />}
          {/* top section */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg">Deals Of The Day</h3>
            <DrawerModalCloseBTN
              handleClose={() => dispatch(resetDealsOfTheDay())}
            />
          </div>

          {/* main section */}

          {/* search Product */}

          <div className="my-5 relative">
            <label htmlFor="productSearch" className="text-gray-400 ">
              Search Product
            </label>
            {data?.productId && (
              <div className="flex items-center gap-2 justify-between w-full px-4 py-3 border border-gray-300 rounded-lg">
                <Image
                  alt="Selected Product"
                  src={mainUrl + data?.productPhoto}
                  width={30}
                  height={30}
                />
                <p>
                  {data?.productName?.length > 25
                    ? `${data?.productName.substring(0, 25)}...`
                    : data?.productName}
                </p>
                <div onClick={() => dispatch(resetProduct())}>
                  {" "}
                  <IconX />
                </div>
              </div>
            )}
            {!data?.productId && (
              <input
                type="text"
                name="productSearch"
                value={data?.productSearch}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search Product"
                onChange={handleChange}
              />
            )}
          </div>
          {data?.productSearch && (
            <div className="absolute  w-full  z-50">
              {" "}
              <DealsOfTheDayProductSearch data={data?.productSearch} />
            </div>
          )}
          {/* Deals of the day main card used here */}
          <div>
            <DealsOfTheDayCard
              className={
                data?.fieldName === "firstDeal"
                  ? "bg-[#F9F9F9]"
                  : " bg-[#0a0303] text-white"
              }
              data={data}
              iconClassName="hidden"
              handleChange={handleChange}
            />
          </div>
          {/* input section */}
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-4 items-center justify-center w-full md:flex-row  flex-col">
              <div className="flex flex-col gap-4 w-full">
                <CustomGlobalInput
                  label="Title"
                  type="text"
                  name="title"
                  value={data?.title}
                  placeholder="Type here"
                  onChange={handleChange}
                />
                <CustomGlobalInput
                  label="Description"
                  type="text"
                  name="description"
                  value={data?.description}
                  placeholder="Type here"
                  onChange={handleChange}
                />
                <CustomGlobalInput
                  label="Link"
                  type="text"
                  name="link"
                  value={data?.link}
                  placeholder="Add Link"
                  onChange={handleChange}
                  className={
                    data?.productId == undefined || data?.productId == ""
                      ? ""
                      : "opacity-50"
                  }
                  disabled={
                    data?.productId == undefined || data?.productId == ""
                      ? false
                      : true
                  }
                />
              </div>
            </div>

            <div className="grid w-full gap-5   grid-cols-2 ">
              <div className="">
                <CustomGlobalInput
                  label="Button Text"
                  type="text"
                  name="buttonText"
                  value={data?.buttonText}
                  placeholder="Shop Now"
                  onChange={handleChange}
                />
              </div>
              {data?.fieldName === "firstDeal" ? (
                <div className=" ">
                  <CustomGlobalInput
                    label="Discount"
                    type="number"
                    name="discount"
                    value={data?.discount}
                    placeholder="0% off"
                    onChange={handleChange}
                    className={
                      data?.productId == undefined || data?.productId == ""
                        ? ""
                        : "opacity-50"
                    }
                    disabled={
                      data?.productId == undefined || data?.productId == ""
                        ? false
                        : true
                    }
                  />
                </div>
              ) : (
                <div className=" ">
                  <CustomGlobalInput
                    label="Tag"
                    type="text"
                    name="tag"
                    value={data?.tag}
                    placeholder="Best Deals"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="w-full flex  items-center lg:justify-end justify-center gap-5 my-10 ">
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Submiting" : "Submit"}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </CustomGlobalDrawer>
    </form>
  );
};

export default DealsOfTheDayDrawer;
