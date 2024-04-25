import React from "react";
interface IGlobalActionButton {
  buttonStyleClassName: string;
  buttonText: string;
  type: "submit" | "reset" | "button";
}

const GlobalActionButton = ({
  buttonText,
  buttonStyleClassName,
  type,
}: IGlobalActionButton) => {
  return (
    <button
      type={type}
      className={`border rounded-custom-5px text-base text-fuchsia-800 bg-main-bg-color-opacity-32 ${buttonStyleClassName}`}
    >
      {buttonText}
    </button>
  );
};

export default GlobalActionButton;
