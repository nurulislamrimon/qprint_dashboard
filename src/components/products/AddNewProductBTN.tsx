"use-client";
import { IconPlus } from "@tabler/icons-react";
import AddNewProductsDrawer from "./AddNewProductsDrawer";

const AddNewProductBTN = ({ openModal, handleCloseModal }: any) => {
  return (
    <div>
      <button
        onClick={openModal}
        className="text-white bg-main-bg-color flex items-center justify-center gap-2.5 py-3 px-2.5 rounded-custom-10px md:text-base text-sm"
      >
        <IconPlus />
        <span>Add New Brand</span>
      </button>
      <div>
        <AddNewProductsDrawer openModal={openModal} />
      </div>
    </div>
  );
};

export default AddNewProductBTN;
