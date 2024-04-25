import CustomGlobalModal from "@/components/shared/CustomGlobalModal";
import GlobalActionButton from "@/components/shared/GlobalActionButton";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

interface DeleteModalProps {
  handleModal?: () => void;
  handleDelete?: any;
  id?: any;
}

const DeleteRequesetPrintingModal = ({
  handleModal,
  handleDelete,
  id,
}: DeleteModalProps) => {
  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal}
        setOpenModal={handleModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center">
          <div>
            <IconTrash width={50} height={50} color="red" stroke={1.5} />
          </div>
          <span>
            Are you sure, delete <span className="font-semibold"></span>?
          </span>
          <div className="flex items-center gap-5">
            <button
              onClick={handleModal}
              className="px-10 py-2.5 border rounded-custom-5px"
            >
              No
            </button>
            <div
              onClick={() => {
                handleModal?.();
                handleDelete(id);
              }}
            >
              <GlobalActionButton
                type="submit"
                buttonText="Yes"
                buttonStyleClassName="px-10 py-2.5"
              />
            </div>
          </div>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default DeleteRequesetPrintingModal;
