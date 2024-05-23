import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { useCreateBrandMutation } from "@/store/features/brand/brandApi";
import { toast } from "react-toastify";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import {
  clearBrandData,
  setBrandName,
  setBrandPhoto,
  setBrandlocalUrl,
} from "@/store/features/brand/createBrandSlice";
import FileInput from "../ui/FileInput";
import { useState } from "react";
import Loader from "../shared/loaders/Loader";

const AddNewBrandModal = ({ open, handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { brandName, brandPhoto, brandlocalUrl } = useAppSelector(
    (state) => state.createBand
  );

  const [createBrand, { error: createError, isLoading: loading }] =
    useCreateBrandMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      dispatch(setBrandPhoto(selectedFile));
    }
    if (event.target.files && event.target.files.length > 0) {
      const reader = URL.createObjectURL(event.target.files[0]);
      dispatch(setBrandlocalUrl(reader));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brandName", brandName);
    formData.append("brandPhoto", brandPhoto as File);
    try {
      const res = await createBrand(formData);
      if (res && "data" in res) {
        dispatch(clearBrandData());
        handleClose();
        toast.success(res.data.message);
      }

      if (res && "error" in res) {
        toast.error((res.error as Error).message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        isVisible={open}
        setOpenDrawer={handleClose}
        drawerControllerClassName="z-50"
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="px-5 py-[30px] flex flex-col gap-10 overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center  justify-between">
            <span className="text-black font-medium text-lg">
              Add New Brand
            </span>
            <DrawerModalCloseBTN handleClose={handleClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[30px]">
              <div>
                <FileInput
                  name="brandPhoto"
                  onChange={handleFileChange}
                  imageBottomText="Add Brand Logo"
                  localUrl={brandlocalUrl}
                />
              </div>
              <div>
                <CustomGlobalInput
                  label="Brand Name"
                  value={brandName}
                  onChange={(e) => dispatch(setBrandName(e.target.value))}
                  placeholder="Brand Name"
                  type="text"
                />
              </div>
            </div>
            <div className="fixed bottom-5 md:w-[450px] w-[calc(100vw-40px)]">
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Adding Brand..." : "Add Brand"}
                className="w-full "
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default AddNewBrandModal;
