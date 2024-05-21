import CustomGlobalDrawer from "@/components/shared/CustomGlobalDrawer";
import CustomGlobalInput from "../../shared/CustomGlobalInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setPaperType,
  setPrice,
} from "@/store/features/shopSetup/printingSetup/paperTypeSlice";
import {
  usePrintingSetupQuery,
  useUpdatePrintingSetupMutation,
} from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/shared/loaders/Loader";

const EditPrintingPaperTypeModal = ({
  openModal,
  handleCloseModal,
  id,
}: any) => {
  const dispatch = useAppDispatch();
  const { price, paperType } = useAppSelector((state) => state.paperType);
  const [updatePrintingSetup] = useUpdatePrintingSetupMutation();
  const { data } = usePrintingSetupQuery(id);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    dispatch(setPaperType(data?.data?.paperType));
    dispatch(setPrice(data?.data?.price));
  }, [data, dispatch]);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      price: price,
      paperType: paperType,
    };

    try {
      const res = await updatePrintingSetup({ data, id });
      console.log(res);
      if (res?.data) {
        toast.success(res?.data?.message);
        handleCloseModal();
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <CustomGlobalDrawer
        modalWidthControlClassName="md:w-[500px] w-full"
        isVisible={openModal}
      >
        <div className="p-5 overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center justify-between mb-[30px]">
            <span className="text-base md:text-lg text-black-opacity-70">
              Add Paper Type
            </span>
            <DrawerModalCloseBTN handleClose={handleCloseModal} />
          </div>
          <form action="" className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 items-center gap-5 mb-5">
              <CustomGlobalInput
                label="Paper Type"
                type="text"
                placeholder="Laser Printer"
                value={paperType}
                onChange={(e) => dispatch(setPaperType(e.target.value))}
              />

              <CustomGlobalInput
                label="Price"
                type="number"
                placeholder="0.00 QR"
                value={price}
                onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
              />
            </div>
            <div className="flex items-center justify-center w-[calc(100vw-40px)] md:w-[460px] fixed bottom-5">
              <ButtonPrimary
                type="submit"
                buttonText="Add Paper Type"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditPrintingPaperTypeModal;
