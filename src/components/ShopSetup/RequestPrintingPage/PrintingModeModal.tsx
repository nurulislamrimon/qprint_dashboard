import CustomGlobalDrawer from "@/components/shared/CustomGlobalDrawer";
import CustomGlobalInput from "../../shared/CustomGlobalInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import {
  setPrintingMode,
  setPrintingModePrice,
} from "@/store/features/shopSetup/printingSetup/printingModeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useCreatePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "@/components/shared/loaders/Loader";

const PrintingModeModal = ({ openModal, handleCloseModal }: any) => {
  const dispatch = useAppDispatch();
  const { price, printingSetupType, printingColorMode } = useAppSelector(
    (state) => state.printingColorMode
  );

  const [createPrintingSetup, { error: createError, isLoading: loading }] =
    useCreatePrintingSetupMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      price: price,
      printingSetupType: printingSetupType,
      printingColorMode: printingColorMode,
    };
    console.log(data);
    try {
      const res = await createPrintingSetup(data);
      console.log(res);
      if (res?.data) {
        toast.success(res?.data?.message);
        handleCloseModal();
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      console.log("Mode error:", error);
    }
    handleCloseModal(false);
  };

  return (
    <div>
      <CustomGlobalDrawer
        isVisible={openModal}
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="p-5 overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center justify-between mb-[30px]">
            <p className="text-base md:text-lg text-black-opacity-70">
              Add Printing Mode
            </p>
            <DrawerModalCloseBTN handleClose={handleCloseModal} />
          </div>
          <form action="" className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 items-center gap-5 mb-5">
              <CustomGlobalInput
                label="Printing Mode"
                type="text"
                placeholder="RGB"
                onChange={(e) => dispatch(setPrintingMode(e.target.value))}
              />

              <CustomGlobalInput
                label="Price"
                type="number"
                placeholder="0.00 QR"
                onChange={(e) =>
                  dispatch(setPrintingModePrice(Number(e.target.value)))
                }
              />
            </div>
            <div className="flex items-center justify-center w-[calc(100vw-40px)] md:w-[460px] fixed bottom-5">
              <ButtonPrimary
                type="submit"
                buttonText="Add Paper Mode"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default PrintingModeModal;
