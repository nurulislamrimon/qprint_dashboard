"use client";
import CustomGlobalDrawer from "@/components/shared/CustomGlobalDrawer";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import Loader from "@/components/shared/loaders/Loader";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import {
  setHeight,
  setWidth,
} from "@/store/features/shopSetup/printingSetup/paperSizeSlice";
import {
  usePrintingSetupQuery,
  useUpdatePrintingSetupMutation,
} from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

const EditPrintingPaperSizeModal = ({
  openModal,
  handleCloseModal,
  id,
}: any) => {
  const [updatePrintingSetup] = useUpdatePrintingSetupMutation();
  const { data } = usePrintingSetupQuery(id);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { width, height, printingSetupType } = useAppSelector(
    (state) => state.paperSize
  );

  useLayoutEffect(() => {
    dispatch(setWidth(Number(data?.data?.width)));
    dispatch(setHeight(Number(data?.data?.height)));
  }, [data, dispatch]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "width") {
      dispatch(setWidth(Number(value)));
    } else if (name === "height") {
      dispatch(setHeight(Number(value)));
    }
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      height: height,
      width: width,
    };
    try {
      const res = updatePrintingSetup({ data, id });
      console.log("update hoyese", res);
      handleCloseModal();
      toast.success("Printing paper size updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Printing paper size update couldn't update! try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        setOpenDrawer={handleCloseModal}
        isVisible={openModal}
      >
        <div className="p-5 overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center justify-between mb-[30px]">
            <p className="text-base md:text-lg text-black-opacity-70">
              Edit Printing Paper Size
            </p>
            <DrawerModalCloseBTN handleClose={handleCloseModal} />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 items-center gap-5 mb-5">
              <CustomGlobalInput
                label="Width"
                type="number"
                placeholder="10"
                name="width"
                value={width}
                onChange={handleChange}
              />
              <CustomGlobalInput
                label="Height"
                type="number"
                placeholder="20"
                name="height"
                value={height}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center w-[calc(100vw-40px)] md:w-[460px] fixed bottom-5">
              <ButtonPrimary
                type="submit"
                buttonText="Update Paper Size"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditPrintingPaperSizeModal;
