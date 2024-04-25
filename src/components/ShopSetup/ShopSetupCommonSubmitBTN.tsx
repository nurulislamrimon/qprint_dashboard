interface ShopSetupCommonSubmitBTNProps {
  submitBTNStyle?: string;
  onClick?: () => void;
  buttonText?: string;
  type: "submit";
}
const ShopSetupCommonSubmitBTN = ({
  submitBTNStyle,
  type,
  onClick,
  buttonText,
}: ShopSetupCommonSubmitBTNProps) => {
  return (
    <button
      className={`${submitBTNStyle} rounded-lg text-white  hover:font-bold bg-main-bg-color hover:bg-main-bg-color-hover transition-all ease-in-out delay-700 py-3.5  flex items-center justify-center px-7 md:w-auto w-full`}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default ShopSetupCommonSubmitBTN;
