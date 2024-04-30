import Image from "next/image";
import logo from "@/assets/qlpgo.png";

const TransparentLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-24 w-24 border-t-[6px] border-b-[6px] border-fuchsia-800"></div>
        <Image src={logo} alt="Loading" width={50} height={50} />
      </div>
    </div>
  );
};

export default TransparentLoader;
