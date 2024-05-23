import React from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
import { useDeleteAuthorReplyMutation } from "@/store/features/review/reviewApi";
import { showError } from "@/helpers/showError";
import { toast } from "react-toastify";
import Loader from "../shared/loaders/Loader";

const DeleteAuthorReplyModal = ({
  handleModal,
  data,
  handleMainModal,
}: any) => {
  const [deleteReview, { error: deleteError, isLoading: loading }] =
    useDeleteAuthorReplyMutation();

  // handle submit
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await deleteReview({ reply: "", id: data?.data?._id });
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      handleModal();
      handleMainModal();
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div>
      <CustomGlobalModal
        mainClassName="w-[400px]"
        isVisible={handleModal}
        setOpenModal={handleModal}
      >
        <div className="flex flex-col items-center gap-10 px-10 py-6 overflow-hidden relative">
          {loading && <Loader />}
          <div className="bg-red-opacity-10 rounded-full p-3.5 flex items-center justify-center">
            <IconAlertTriangle
              className="text-red-color"
              width={24}
              height={24}
            />
          </div>
          <span>
            Are you sure, want to delete <strong>{data?.data?.reply}</strong>?
          </span>
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => handleModal()}
              className="flex items-center justify-center px-8 py-3 border rounded-md"
            >
              No
            </button>
            <button
              onClick={(e: any) => handleDelete(e)}
              className="flex items-center justify-center px-8  rounded-md py-3 bg-main-bg-color-opacity-32 text-fuchsia-800"
            >
              Yes
            </button>
          </div>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default DeleteAuthorReplyModal;
