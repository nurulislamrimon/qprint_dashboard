import CustomGlobalModal from "@/components/shared/CustomGlobalModal";
import GlobalActionButton from "@/components/shared/GlobalActionButton";
import Loader from "@/components/shared/loaders/Loader";
import { useDeletePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface DeleteModalProps {
  handleModal?: (() => void | undefined) | any;
  id?: any;
}

const DeleteRequesetPrintingModal = ({ handleModal, id }: DeleteModalProps) => {
  const [deletePrintingSetup, { error: deleteError, isLoading: loading }] =
    useDeletePrintingSetupMutation();
  //handle delete
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const res = await deletePrintingSetup(id);

      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
      handleModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal}
        setOpenModal={handleModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <form onSubmit={handleDelete}>
          <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center relative overflow-hidden">
            {loading && <Loader />}
            <div>
              <IconTrash width={50} height={50} color="red" stroke={1.5} />
            </div>
            <span>
              Are you sure, delete{" "}
              <span className="font-semibold">this layout</span>?
            </span>
            <div className="flex items-center gap-5">
              <button
                onClick={handleModal}
                className="px-10 py-2.5 border rounded-custom-5px"
              >
                No
              </button>
              <div>
                <GlobalActionButton
                  type="submit"
                  buttonText="Yes"
                  buttonStyleClassName="px-10 py-2.5"
                />
              </div>
            </div>
          </div>
        </form>
      </CustomGlobalModal>
    </div>
  );
};

export default DeleteRequesetPrintingModal;
