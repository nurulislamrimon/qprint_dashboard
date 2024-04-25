import Image from 'next/image';
import productNotfoundImg from "@/assets/productNotfound.png";



interface ProductEmptyStateProps {
    message?: string;
   
}

const ProductEmptyState = ({message}: ProductEmptyStateProps ) => {
    return (
        <div className="flex flex-col gap-3.5 justify-center items-center h-full">
            <Image
                className="h-[150px] w-[150px]"
                alt="No Product Found"
                src={productNotfoundImg}
            />
            <span className="font-semibold text-black-opacity-70 text-xl">
                Oops!
            </span>
            <span className="text-black-opacity-50 text-lg">
                {message}
            </span>
        </div>
    );
};

export default ProductEmptyState;