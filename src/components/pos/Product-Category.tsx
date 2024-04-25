import { mainUrl } from "@/constants/mainUrl";
import { setSearchProductByCategory, setSearchProductByCategoryEmpty } from "@/store/features/searchProductByCategory/searchProductByCategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import productImgPlaceholder from "@/assets/productPlaceholder.svg";


const ProductCategory = ({ categoryData, isLoading }: any) => {
  const dispatch = useAppDispatch();
  const { searchProductByCategory } = useAppSelector((state) => state.searchProductByCategorySlice);


  const handleClick = (categoryName: string) => {
    dispatch(setSearchProductByCategory(categoryName));
  };



  return (
    <div

      onClick={() => handleClick(categoryData?.categoryName)}
      className={`${searchProductByCategory === categoryData?.categoryName ? "bg-main-bg-color text-white" : ''} text-black flex items-center gap-3 border justify-center px-4 py-2 rounded-full cursor-pointer  hover:bg-main-bg-color hover:text-white w-auto transition-all shrink-0 whitespace-nowrap `}
    >
      <div className="w-[30px] h-[30px]  rounded-full flex items-center justify-center overflow-hidden bg-white">
        <Image
          alt="Category Pic"
          height={30}
          width={30}
          src={isLoading ? productImgPlaceholder : `${mainUrl}${categoryData?.categoryPhoto}`}
        />
      </div>
      <span className="text-sm">{categoryData?.categoryName}</span>
    </div>
  );
};

export default ProductCategory;
