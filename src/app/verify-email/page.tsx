import Image from "next/image";
import lockImage from "@/assets/lock-image.svg";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import OtpForm from "@/components/shared/OtpForm";

const VerifyEmail = () => {
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
          Enter 4 Digits Code
        </h3>
        <p className="text-center text-black text-opacity-50 text-[16px] mb-2">
          Set the password for your account so <br /> you can access all the
          features.
        </p>

        <form action="" className="flex flex-col gap-8">
          <OtpForm />
          <ButtonPrimary
            buttonText="Continue"
            type="submit"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
