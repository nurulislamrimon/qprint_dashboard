interface ShopSetupCommonSubmitBTNProps {
  className?: string;
  onClick?: () => void;
  buttonText?: string;
  type: "submit" | "reset";
}
const ButtonSecondary = ({
  className,
  type,
  onClick,
  buttonText,
}: ShopSetupCommonSubmitBTNProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg text-fuchsia-800   bg-main-bg-color-opacity-32 hover:opacity-90 transition-all duration-500 py-3  flex items-center justify-center px-10 `}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default ButtonSecondary;
