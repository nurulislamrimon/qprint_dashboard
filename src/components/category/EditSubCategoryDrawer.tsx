"use client";
import { useUpdateSubCategoryMutation } from "@/store/features/category/categoryApi";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setSubCategory } from "@/store/features/category/subCategorySlice";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

interface EditSubCategoryDrawerProps {
  data: any;
  openDrawer?: boolean;
  handleCloseDrawer?: () => void;
}

const EditSubCategoryDrawer = ({
  openDrawer,
  handleCloseDrawer,
  data,
}: EditSubCategoryDrawerProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const { subcategoryName } = useAppSelector((state) => state.subCategorySlice);

  useLayoutEffect(() => {
    dispatch(setSubCategory(data?.subcategoryName));
  }, [data, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateSubCategory({
        data: { subcategoryName: subcategoryName },
        id: data?._id,
      });

      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={loading ? "opacity-50 pointer-events-none" : ""}>
      <CustomGlobalDrawer
        modalWidthControlClassName="w-full md:w-[500px]"
        isVisible={openDrawer}
      >
        <div className="md:px-5 p-5 md:py-7 ">
          <div className="flex items-center justify-between">
            <span className="text-lg text-black-opacity-70">
              Edit Sub Category
            </span>
            <DrawerModalCloseBTN handleClose={handleCloseDrawer} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-[30px]">
              <CustomGlobalInput
                name="subcategoryName"
                type="text"
                value={subcategoryName}
                onChange={(e) => dispatch(setSubCategory(e.target.value))}
                label="Sub Category Name"
                placeholder="Type here"
              />
            </div>
            <div className="fixed bottom-5  md:w-[465px] w-[calc(100vw-40px)]">
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Loading..." : "Update Sub Category"}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditSubCategoryDrawer;
