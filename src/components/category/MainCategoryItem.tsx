import { mainUrl } from "@/constants/mainUrl";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { Category } from "./CategoryHomePage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setSubCategoryProps } from "@/store/features/category/subCategoryPropsSlice";
import { useState } from "react";
import EditMainCategoryDrawer from "./EditMainCategoryDrawer";
import productImgPlaceholder from "@/assets/productPlaceholder.svg";

interface MainCategoryProps {
  isLoading?: boolean;
  data?: Category;
}

const MainCategoryItem = ({ data, isLoading }: MainCategoryProps) => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.subCategoryPropsSlice);

  const [updateCategoryDrawer, setUpdateCategoryDrawer] = useState(false);

  const handleModal = () => {
    setUpdateCategoryDrawer((prevState) => !prevState);
  };

  return (
    <div>
      <div
        onClick={(e) => dispatch(setSubCategoryProps(data))}
        className={`${
          _id === data?._id && "bg-main-bg-color-opacity-32"
        } group border rounded-full px-2.5 py-1.5 flex items-center gap-8 cursor-pointer justify-between hover:bg-main-bg-color-opacity-32 transition-all md:border-none md:rounded-custom-5px md:px-5  md:py-1.5 shrink-0 overflow-hidden`}
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-white border rounded-full overflow-hidden  flex items-center justify-center shrink-0">
            <Image
              quality={100}
              src={
                isLoading
                  ? productImgPlaceholder
                  : `${mainUrl}${data?.categoryPhoto}`
              }
              alt="Category Icon"
              height={30}
              width={30}
              className="w-[30px] h-[30px] object-fit"
            />
          </div>
          <div>
            <span className="group-hover:text-fuchsia-800 line-clamp-1 md:text-base text-sm transition-all text-black-opacity-70 ">
              {data?.categoryName}
            </span>
          </div>
        </div>
        <div className="group-hover:flex items-center hidden  transition-all">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUpdateCategoryDrawer(true);
            }}
          >
            <IconEdit
              stroke={1}
              className="text-fuchsia-800 md:w-5 md:h-5 w-4 h-4"
            />
          </button>
        </div>
      </div>
      {updateCategoryDrawer && (
        <EditMainCategoryDrawer
          data={data}
          initialLoading={isLoading}
          isVisible={updateCategoryDrawer}
          setOpenDrawer={setUpdateCategoryDrawer}
          handleModal={handleModal}
        />
      )}
    </div>
  );
};

export default MainCategoryItem;
