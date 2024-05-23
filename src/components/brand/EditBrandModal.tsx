import {
  useBrandQuery,
  useUpdateBrandMutation,
} from "@/store/features/brand/brandApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";
import {
  clearBrandData,
  setBrandName,
  setBrandPhoto,
  setBrandlocalUrl,
} from "@/store/features/brand/editBrandSlice";
import FileInput from "../ui/FileInput";
import { mainUrl } from "@/constants/mainUrl";
import Loader from "../shared/loaders/Loader";

const EditBrandModal = ({ open, handleClose, id }: any) => {
  const { data } = useBrandQuery(id);
  const dispatch = useAppDispatch();
  const [updateBrand, { error: updateError, isLoading: loading }] =
    useUpdateBrandMutation();
  const { brandName, brandPhoto, brandlocalUrl } = useAppSelector(
    (state: RootState) => state.editBrandSlice
  );

  console.log(`${mainUrl}${data?.data?.brandPhoto}`);

  useLayoutEffect(() => {
    dispatch(setBrandName(data?.data?.brandName));
    dispatch(setBrandPhoto(data?.data?.brandPhoto));
  }, [data, dispatch]);

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
    if (brandPhoto) {
      formData.append("brandPhoto", brandPhoto);
    }
    try {
      const res = await updateBrand({ formData, id });
      console.log(res);
      if ("data" in res && res.data) {
        toast.success(res.data.message);
      }
      if ("error" in res && res?.error) {
        if (typeof res.error === "object" && "message" in res.error) {
          toast.error(res.error.message as React.ReactNode);
        }
      }

      dispatch(clearBrandData());
      handleClose();
    } catch (error) {
      // toast.error(error?.message)
      console.error(error);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        isVisible={open}
        drawerControllerClassName="z-50"
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="px-5 py-[30px] flex flex-col gap-10 overflow-hidden">
          {loading && <Loader />}
          <div className="flex items-center justify-between">
            <span className="text-black font-medium text-lg">Update Brand</span>
            <DrawerModalCloseBTN handleClose={handleClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[30px]">
              <div>
                <FileInput
                  name="brandPhoto"
                  onChange={handleFileChange}
                  imageBottomText="Add Brand Logo"
                  localUrl={
                    brandlocalUrl === ""
                      ? `${mainUrl}${brandPhoto}`
                      : brandlocalUrl
                  }
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
                buttonText={loading ? "Updating Brand..." : "Update Brand"}
                className="w-full "
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditBrandModal;
