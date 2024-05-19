import { useAppDispatch, useAppSelector } from "@/store/hook";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useUpdateCategoryMutation } from "@/store/features/category/categoryApi";
import { useLayoutEffect, useState } from "react";
import {
  setCategoryLocalUrl,
  setCategoryName,
  setCategoryPhoto,
} from "@/store/features/category/categorySlice";
import { toast } from "react-toastify";
import FileInput from "../ui/FileInput";
import { mainUrl } from "@/constants/mainUrl";
import Loader from "../shared/loaders/Loader";

const EditMainCategoryDrawer = ({ data, handleDrawer }: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [updateCategory] = useUpdateCategoryMutation();
  const { categoryName, categoryLocalUrl, categoryPhoto } = useAppSelector(
    (state) => state.categorySlice
  );
  const formData = new FormData();

  useLayoutEffect(() => {
    dispatch(setCategoryName(data?.categoryName));
    dispatch(setCategoryPhoto(data?.categoryPhoto));
  }, [data, dispatch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (categoryName !== data?.categoryName) {
      formData.append("categoryName", categoryName);
    }
    formData.append("categoryPhoto", categoryPhoto as File);

    try {
      const res = await updateCategory({ formData: formData, id: data._id });
      console.log(res);

      if (res?.data) {
        toast.success(res?.data?.message);
        handleDrawer();
      }
      if (res?.error) {
        toast.error(res?.error.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        modalWidthControlClassName="w-full md:w-[500px]"
        isVisible={handleDrawer}
      >
        <div className="md:px-5 p-5 md:py-7 overflow-hidden">
          {loading && <Loader />}

          <div className="flex items-center justify-between">
            <span className="text-lg text-black-opacity-70">Edit Category</span>
            <DrawerModalCloseBTN handleClose={handleDrawer} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-[30px]">
              <CustomGlobalInput
                name="categoryName"
                type="text"
                value={categoryName}
                onChange={(e) => dispatch(setCategoryName(e.target.value))}
                label="Category Name"
                placeholder="Type here"
              />
              <FileInput
                name="categoryPhoto"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target?.files?.length) {
                    dispatch(setCategoryPhoto(e.target?.files[0]));
                    // create image url using file value
                    const reader = URL.createObjectURL(e.target?.files[0]);

                    dispatch(setCategoryLocalUrl(reader));
                  }
                }}
                imageBottomText="Add Category Photo"
                localUrl={
                  categoryLocalUrl === ""
                    ? `${mainUrl}${categoryPhoto}`
                    : categoryLocalUrl
                }
              />
            </div>
            <div className="fixed bottom-5  md:w-[465px] w-[calc(100vw-40px)]">
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Loading..." : "Update Category"}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditMainCategoryDrawer;
