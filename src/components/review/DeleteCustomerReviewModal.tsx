import { IconAlertTriangle } from "@tabler/icons-react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import GlobalActionButton from "../shared/GlobalActionButton";
import Loader from "../shared/loaders/Loader";

const DeleteCustomerReviewModal = ({
  handleModal,
  handleDelete,
  loading,
}: any) => {
  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal}
        setOpenModal={handleModal}
        mainClassName="w-[400px]"
      >
        <form onSubmit={handleDelete}>
          <div className="flex flex-col gap-10 items-center px-10 py-8 relative overflow-hidden">
            {loading && <Loader />}
            <div className="bg-red-opacity-10 rounded-full p-2.5">
              <IconAlertTriangle
                className="text-red-color"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-lg">Are you sure, delete this review?</span>
              <div className="flex items-center justify-center gap-10">
                <button
                  onClick={() => handleModal()}
                  type="reset"
                  className="flex border items-center justify-center px-10 py-3.5 rounded-md"
                >
                  No
                </button>
                <div>
                  <GlobalActionButton
                    type="submit"
                    buttonText="Yes"
                    buttonStyleClassName="px-10 py-3.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CustomGlobalModal>
    </div>
  );
};

export default DeleteCustomerReviewModal;
