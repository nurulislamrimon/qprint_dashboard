"use client";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ShopSetupCommonSubmitBTN from "./ShopSetupCommonSubmitBTN";
import {
  setDiscountPercentage,
  setMaxAmount,
} from "@/store/features/shopSetup/specialOffer/specialOfferSlice";
import {
  useAddSpecialOfferMutation,
  useGetSpecialOfferQuery,
} from "@/store/features/shopSetup/specialOffer/specialOfferApi";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";

const SpecialOffer = () => {
  const dispatch = useAppDispatch();
  const { maxAmount = 0, discountPercentage = 0 } = useAppSelector(
    (state) => state.specialOfferSlice
  );
  const { data } = useGetSpecialOfferQuery("");
  const [addSpecialOffer] = useAddSpecialOfferMutation();

  useLayoutEffect(() => {
    dispatch(setDiscountPercentage(Number(data?.data?.discountPercentage)));
    dispatch(setMaxAmount(Number(data?.data?.maxAmount)));
  }, [data, dispatch]);

  const hanldleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      maxAmount: maxAmount || 0,
      discountPercentage: discountPercentage || 0,
    };

    try {
      const res = await addSpecialOffer(data);
      if ("data" in res && res.data) {
        toast.success(res.data.message);
      }
      if ("error" in res && res.error instanceof Error) {
        toast.error(res.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={hanldleSubmit} className="p-5 md:p-8">
      <div className="mt-10 flex flex-col gap-7">
        <span className="text-xl">If User Cancel</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[30px]">
          <CustomGlobalInput
            value={discountPercentage || 0}
            onChange={(e) =>
              dispatch(setDiscountPercentage(Number(e.target.value)))
            }
            name="discountPercentage"
            type="number"
            label="Discount (Percent)"
            placeholder="10%"
          />
          <CustomGlobalInput
            value={maxAmount || 0}
            onChange={(e) => dispatch(setMaxAmount(Number(e.target.value)))}
            name="setMaxAmount"
            type="number"
            label="Max amount"
            placeholder="30 QAR"
          />
        </div>
      </div>

      <div className="md:fixed md:right-7 md:bottom-7 md:mt-0 mt-5">
        <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
      </div>
    </form>
  );
};

export default SpecialOffer;
