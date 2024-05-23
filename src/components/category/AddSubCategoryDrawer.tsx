import { useCreateSubcategoryMutation } from "@/store/features/category/categoryApi";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setSubCategory } from "@/store/features/category/subCategorySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../shared/loaders/Loader";

interface AddSubCategoryDrawerProps {
  handleModal: () => void;
  id: string;
}

const AddSubCategoryDrawer = ({
  handleModal,
  id,
}: AddSubCategoryDrawerProps) => {
  const dispatch = useAppDispatch();
  const { subcategoryName } = useAppSelector((state) => state.subCategorySlice);
  const [createSubcategory, { isLoading: loading }] =
    useCreateSubcategoryMutation();
  const formData = new FormData();

  // handle submit

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subcategoryName) {
      formData.append("createSubcategories", subcategoryName);

      try {
        const res = await createSubcategory({ data: formData, id: id });
        handleModal();
        if (res?.data) {
          toast.success(res?.data?.message);
        }
        if (res?.error) {
          toast.error(res?.error.message);
        }
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        isVisible={!!handleModal}
        setOpenDrawer={handleModal}
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <form
          onSubmit={handleSubmit}
          className="md:px-5 p-5 md:py-7 overflow-hidden"
        >
          {loading && <Loader />}
          <div className="flex items-center justify-between">
            <span className="text-lg text-black-opacity-70">
              Add Sub Category
            </span>
            <DrawerModalCloseBTN handleClose={handleModal} />
          </div>
          <div className="mt-[30px]">
            <CustomGlobalInput
              label="Sub Category Name"
              placeholder="Type here"
              name="subcategoryName"
              onChange={(e) => dispatch(setSubCategory(e.target.value))}
            />
          </div>
          <div className="fixed bottom-5 md:w-[465px] w-[calc(100vw-40px)]">
            <ButtonPrimary
              type="submit"
              buttonText={loading ? "Adding..." : "Add Sub Category"}
              className="w-full"
              disabled={loading}
            />
          </div>
        </form>
      </CustomGlobalDrawer>
    </div>
  );
};

export default AddSubCategoryDrawer;
