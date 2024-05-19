"use client";
import { useState, useEffect } from "react";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import {
  useAddQuickOrderChargeMutation,
  useGetQuickOrderChargeQuery,
} from "@/store/features/shopSetup/quickOrder/quickOrderApi";
import SpecialOffer from "@/components/ShopSetup/SpecialOffer";
import { toast } from "react-toastify";
import Loader from "@/components/shared/loaders/Loader";

const QuickOrder = () => {
  const [isQuickOrderActive, setIsQuickOrderActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("deliveryCharge");
  const [addQuickOrderCharge] = useAddQuickOrderChargeMutation();
  const { data, isLoading } = useGetQuickOrderChargeQuery("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.data) {
      setIsQuickOrderActive(data.data.isQuickOrderServiceActive);
      setDeliveryCharge(data.data.deliveryCharge);
    }

    // Retrieve selected option from localStorage
    const savedOption = localStorage.getItem("selectedOption");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [data]);

  const handleQuickOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsQuickOrderActive(event.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDeliveryCharge(value);
  };

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOption", option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      let chargeValue;
      if (selectedOption === "freeShipping") {
        chargeValue = 0;
      } else {
        chargeValue = parseInt(deliveryCharge);
      }

      const formData = {
        isQuickOrderServiceActive: isQuickOrderActive,
        deliveryCharge: chargeValue,
      };
      const res = await addQuickOrderCharge(formData);

      if (res && "data" in res) {
        toast.success(res.data.message);
      }
      if (res && "error" in res) {
        const error = res.error as { message: string };
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {loading && <Loader />}
      <form className="p-5 md:p-8" onSubmit={handleSubmit}>
        <div className="flex items-center md:gap-5 justify-between md:justify-normal mb-7 md:mb-10">
          <h2 className="text-xl font-medium">Quick Order Features</h2>
          <>
            <input
              type="checkbox"
              id="quick-order"
              className="toggle-input"
              name="isQuickOrderServiceActive"
              checked={isQuickOrderActive}
              onChange={handleQuickOrderChange}
            />
            <label htmlFor="quick-order" className="toggle-label">
              Toggle
            </label>
          </>
        </div>

        <div
          className={`flex items-center gap-2 my-[30px] ${
            !isQuickOrderActive || isLoading
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <input
            type="radio"
            checked={selectedOption === "freeShipping"}
            onChange={() => handleOptionChange("freeShipping")}
            disabled={!isQuickOrderActive || isLoading}
            className="form-radio text-green-500 h-5 w-5 checked:bg-fuchsia-800 cursor-pointer"
          />
          <label className="text-black-opacity-70  text-xl" htmlFor="">
            Free Shipping Fee
          </label>
        </div>

        <div
          className={`flex md:flex-col flex-col-reverse gap-5 mb-[30px] ${
            !isQuickOrderActive || isLoading
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <input
              type="radio"
              checked={selectedOption === "deliveryCharge"}
              onChange={() => handleOptionChange("deliveryCharge")}
              disabled={!isQuickOrderActive || isLoading}
              className="form-radio text-green-500 h-5 w-5 checked:bg-fuchsia-800 cursor-pointer"
            />
            <label className="text-black-opacity-70  text-xl" htmlFor="">
              Delivery Charge
            </label>
          </div>

          {selectedOption === "deliveryCharge" && (
            <CustomGlobalInput
              type="number"
              placeholder="Delivery Charge"
              name="deliveryCharge"
              value={deliveryCharge || 0}
              // @ts-ignore
              onChange={handleChange}
              disabled={!isQuickOrderActive || isLoading}
            />
          )}
        </div>
        <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
      </form>
      <hr />
      {/* Special Offers for cancelled by users */}
      <SpecialOffer />
    </div>
  );
};

export default QuickOrder;
