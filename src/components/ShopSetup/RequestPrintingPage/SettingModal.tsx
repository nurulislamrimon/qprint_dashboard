import CustomGlobalModal from "@/components/shared/CustomGlobalModal";
import DrawerModalCloseBTN from "@/components/shared/DrawerModalCloseBTN";
import Loader from "@/components/shared/loaders/Loader";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { useCreatePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { setUnit } from "@/store/features/shopSetup/printingSetup/unitSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React, { useState } from "react";

const SettingModal = ({ handleModal }: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { unit } = useAppSelector((state) => state.unitSlice);
  console.log(unit);
  const [createPrintingSetup] = useCreatePrintingSetupMutation();

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      unit: unit,
      printingSetupType: "Paper Size Unit",
    };

    try {
      const res = await createPrintingSetup(data);

      handleModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <CustomGlobalModal
        mainClassName="w-[500px]"
        setOpenModal={handleModal}
        isVisible={handleModal}
      >
        <div className="p-5 relative flex flex-col gap-12 overflow-hidden">
          {loading && <Loader />}
          <span className="text-lg text-black-opacity-10">Settings</span>
          <div className="absolute top-2.5 right-2.5">
            <DrawerModalCloseBTN handleClose={handleModal} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2.5">
                <label>Paper size in</label>
                <select
                  className="form-select w-full border outline-none px-3.5 py-2.5 rounded-md bg-white text-black-opacity-70"
                  onChange={(e) => dispatch(setUnit(e.target.value))}
                >
                  <option value="Feet">Feet</option>
                  <option value="Inch">Inch</option>
                  <option value="C.m">C.m</option>
                  <option value="Metre">Metre</option>
                </select>
              </div>

              <ButtonPrimary
                buttonText={loading ? "Loading..." : "Update"}
                className={"w-full"}
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default SettingModal;
