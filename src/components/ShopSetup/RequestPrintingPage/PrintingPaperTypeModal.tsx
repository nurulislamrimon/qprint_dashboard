import CustomGlobalDrawer from "@/components/shared/CustomGlobalDrawer";
import CustomGlobalInput from "../../shared/CustomGlobalInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setPaperType,
  setPrice,
} from "@/store/features/shopSetup/printingSetup/paperTypeSlice";
import { useCreatePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { toast } from "react-toastify";

const PrintingPaperTypeModal = ({ openModal, handleCloseModal }: any) => {
  const dispatch = useAppDispatch();
  const { price, printingSetupType, paperType } = useAppSelector(
    (state) => state.paperType
  );
  const [createPrintingSetup] = useCreatePrintingSetupMutation();

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      price: price,
      printingSetupType: printingSetupType,
      paperType: paperType,
    };

    try {
      const res = await createPrintingSetup(data);
      if (res?.data) {
        toast.success(res?.data?.message);
        handleCloseModal();
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CustomGlobalDrawer
        setOpenDrawer={handleCloseModal}
        isVisible={openModal}
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="p-5">
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
                onChange={(e) => dispatch(setPaperType(e.target.value))}
              />

              <CustomGlobalInput
                label="Price"
                type="number"
                placeholder="0.00 QR"
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

export default PrintingPaperTypeModal;
