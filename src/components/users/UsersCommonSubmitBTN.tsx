import { IconUser } from "@tabler/icons-react";

interface UsersCommonSubmitBTNProps {
  containerStyle?: string;
  type: "submit";
  buttonText: string;
}

const UsersCommonSubmitBTN = ({
  containerStyle,
  type,
  buttonText,
}: UsersCommonSubmitBTNProps) => {
  return (
    <button
      className={`${containerStyle} rounded-lg text-white  bg-main-bg-color hover:bg-main-bg-color-hover py-3.5 w-full  flex items-center justify-center gap-2 text-[18px]`}
    >
      <span>
        <IconUser />
      </span>
      {buttonText}
    </button>
  );
};

export default UsersCommonSubmitBTN;
