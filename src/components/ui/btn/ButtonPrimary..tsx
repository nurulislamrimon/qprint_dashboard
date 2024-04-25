interface ShopSetupCommonSubmitBTNProps {
  className?: string;
  onClick?: () => void;
  buttonText?: string;
  type: "submit" | "reset";
  disabled?: boolean;
}
const ButtonPrimary = ({
  className,
  type,
  onClick,
  buttonText,
  disabled,
}: ShopSetupCommonSubmitBTNProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} rounded-md text-white bg-main-bg-color hover:opacity-90 transition-all duration-500 py-3  flex items-center justify-center px-10 `}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default ButtonPrimary;
