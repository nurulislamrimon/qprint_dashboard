import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import Image from "next/image";
import lockImage from "@/assets/lock-image.svg";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

const ForgetPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center mx-3">
      <div className=" bg-white shadow-product-card-shadow md:px-11 pb-7 rounded-2xl px-5 py-5">
        <div className="flex items-center justify-center">
          <Image
            src={lockImage}
            alt="verifyEmailLogo"
            className="[width:clamp(60px,10vw,100px)]"
          />
        </div>
        <h3 className="text-black-opacity-80 text-center font-bold text-xl md:text-2xl my-4">
          Forgot Password
        </h3>
        <p className="text-center text-black text-opacity-50 text-[16px] mb-8">
          Set the password for your account so <br /> you can access all the
          features.
        </p>

        <form action="" className="flex flex-col gap-10">
          <CustomGlobalInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            className={`w-full md:w-[450px]`}
          />

          <ButtonPrimary
            buttonText="Continuew"
            type="submit"
            className="w-full"
          />
        </form>
        <Link
          href={"/login"}
          className="flex items-center justify-center main-text-color font-bold mt-10"
        >
          <span className="text-fuchsia-600">
            <IconChevronLeft width={24} height={24} stroke={1} />
          </span>
          Back
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
