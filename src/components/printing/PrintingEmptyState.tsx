import orderEmptystate from "@/assets/brandNotFound.png";
import Image from "next/image";

const PrintingEmptyState = () => {
    return (
        <div className="flex items-center justify-center bg-white h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center">
                <Image src={orderEmptystate} alt="no data" />
                <span className="text-center text-lg text-black-opacity-50 mt-3.5">
                    No Printing Request.
                </span>
            </div>
        </div>
    );
};

export default PrintingEmptyState;