import { IconX } from "@tabler/icons-react";
import React from "react";

const DrawerModalCloseBTN = ({ handleClose }: any) => {
  return (
    <button
      onClick={handleClose}
      className="hover:rotate-90 transition-all print:hidden"
    >
      <IconX stroke={1} color="#000" />
    </button>
  );
};

export default DrawerModalCloseBTN;
