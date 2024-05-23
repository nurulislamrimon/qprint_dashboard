import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconTrash } from "@tabler/icons-react";
import GlobalActionButton from "../shared/GlobalActionButton";
import {
  useDeleteAdminMutation,
  useGetUserByIdQuery,
} from "@/store/features/users/usersApi";
import Loader from "../shared/loaders/Loader";
import { toast } from "react-toastify";

const UserDeleteModal = ({
  openDeleteModal,
  handleModal,
  id,
  setOpenDeleteModal,
}: any) => {
  const { data: user } = useGetUserByIdQuery(id);
  const [deleteAdmin, { error: deleteError, isLoading: loading }] =
    useDeleteAdminMutation();

  // user delete handler
  const userDeleteHandler = async (id: string) => {
    try {
      const res = await deleteAdmin(id);
      if ("data" in res) {
        toast.success("User Deleted Successfully");
      }
      if ("error" in res) {
        // @ts-ignore
        toast.error(res.data?.error?.message);
      }
      handleModal();
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div>
      <CustomGlobalModal
        setOpenModal={setOpenDeleteModal}
        isVisible={openDeleteModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center relative overflow-hidden">
          {loading && <Loader />}
          <div>
            <IconTrash width={50} height={50} color="red" stroke={1.5} />
          </div>
          <span>
            Are you sure, delete{" "}
            <span className="font-semibold">{user?.data?.fullName}</span>?
          </span>
          <div className="flex items-center gap-5">
            <button
              onClick={handleModal}
              className="px-10 py-2.5 border rounded-custom-5px"
            >
              No
            </button>
            <div onClick={() => userDeleteHandler(user?.data?._id)}>
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

export default UserDeleteModal;
