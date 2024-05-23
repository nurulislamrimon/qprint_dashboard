"use client";
import {
  clearPaperSize,
  setHeight,
  setWidth,
} from "@/store/features/shopSetup/printingSetup/paperSizeSlice";
import CustomGlobalDrawer from "@/components/shared/CustomGlobalDrawer";
import CustomGlobalInput from "../../shared/CustomGlobalInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useCreatePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "@/components/shared/loaders/Loader";

const PrintingPaperSizeModal = ({ openModal, handleCloseModal }: any) => {
  const dispatch = useAppDispatch();
  const { height, width, printingSetupType } = useAppSelector(
    (state) => state.paperSize
  );

  const [createPrintingSetup, { error: createError, isLoading: loading }] =
    useCreatePrintingSetupMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createPrintingSetup({
        height,
        width,
        printingSetupType: printingSetupType,
      });
      handleCloseModal();
      toast.success("New Printing Paper Size added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while adding new Printing Paper Size");
    }
    clearPaperSize();
  };

  return (
    <div>
      <CustomGlobalDrawer
        setOpenDrawer={handleCloseModal}
        isVisible={openModal}
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="p-5  overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center justify-between mb-[30px]">
            <p className="text-base md:text-lg text-black-opacity-70">
              Add Printing Paper Size
            </p>
            <DrawerModalCloseBTN handleClose={handleCloseModal} />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 items-center gap-5 mb-5">
              <CustomGlobalInput
                required
                label="Width"
                type="number"
                placeholder="10"
                name="width"
                onChange={(e) => dispatch(setWidth(Number(e.target.value)))}
              />
              <CustomGlobalInput
                required
                label="Height"
                type="number"
                placeholder="20"
                name="height"
                onChange={(e) => dispatch(setHeight(Number(e.target.value)))}
              />
            </div>
            <div className="flex items-center justify-center w-[calc(100vw-40px)] md:w-[460px] fixed bottom-5">
              <ButtonPrimary
                type="submit"
                buttonText="Add New Paper Size"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default PrintingPaperSizeModal;
