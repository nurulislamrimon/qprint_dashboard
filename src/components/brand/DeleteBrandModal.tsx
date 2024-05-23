import React from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconTrash } from "@tabler/icons-react";
import {
  useBrandQuery,
  useDeleteBrandMutation,
} from "@/store/features/brand/brandApi";
import GlobalActionButton from "../shared/GlobalActionButton";
import Loader from "../shared/loaders/Loader";
import { toast } from "react-toastify";

const DeleteBrandModal = ({
  openDeleteModal,
  handCloseleDeleteModal,
  id,
  data,
}: any) => {
  const { data: brand } = useBrandQuery(id);
  const [deleteBrand, { error: updateError, isLoading: loading }] =
    useDeleteBrandMutation();

  // handle delete
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteBrand(id);

      if (res && "data" in res) {
        toast.success(res.data.message);
        handCloseleDeleteModal();
      }
      if (
        res &&
        "error" in res &&
        res.error !== null &&
        typeof res.error === "object" &&
        "message" in res.error
      ) {
        toast.error(res.error.message as string);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <CustomGlobalModal
        isVisible={openDeleteModal}
        setOpenModal={handCloseleDeleteModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center overflow-hidden">
          {loading && <Loader />}
          <div>
            <IconTrash width={50} height={50} color="red" stroke={1.5} />
          </div>
          <span>
            Are you sure, delete{" "}
            <span className="font-semibold">{brand?.data?.brandName}</span>?
          </span>
          <div className="flex items-center gap-5">
            <button
              onClick={handCloseleDeleteModal}
              className="px-10 py-2.5 border rounded-custom-5px"
            >
              No
            </button>
            <div onClick={() => deleteHandler(data?._id)}>
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

export default DeleteBrandModal;
