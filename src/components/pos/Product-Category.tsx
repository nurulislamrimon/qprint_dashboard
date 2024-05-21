import { mainUrl } from "@/constants/mainUrl";
import {
  resetFilterProductByCategory,
  setSearchProductByCategory,
} from "@/store/features/searchProductByCategory/searchProductByCategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";

const ProductCategory = ({ categoryData }: any) => {
  const dispatch = useAppDispatch();
  const { searchProductByCategory } = useAppSelector(
    (state) => state.searchProductByCategorySlice
  );

  const handleClick = (event: React.MouseEvent, categoryName: string) => {
    event.stopPropagation();
    if (searchProductByCategory === categoryName) {
      dispatch(resetFilterProductByCategory());
    } else {
      dispatch(setSearchProductByCategory(categoryName));
    }
  };

  return (
    <section>
      <div
        onClick={(event) => handleClick(event, categoryData?.categoryName)}
        className={`${
          searchProductByCategory === categoryData?.categoryName
            ? "bg-main-bg-color text-white"
            : "bg-white text-black"
        }  flex items-center gap-3 border justify-center px-4 py-2 rounded-full cursor-pointer w-auto transition-all shrink-0 whitespace-nowrap`}
      >
        <div className="w-[30px] h-[30px] relative shrink-0">
          <Image
            src={`${mainUrl + categoryData?.categoryPhoto}`}
            alt="Category Pic"
            placeholder="blur"
            blurDataURL={`${mainUrl}${categoryData?.categoryPhoto}`}
            fill
            style={{
              objectFit: "cover",
            }}
            className="w-full h-full top-0 left-0 object-cover rounded-full"
          />
        </div>

        <span className="text-sm">{categoryData?.categoryName}</span>
      </div>
    </section>
  );
};

export default ProductCategory;
