"use client";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import { useState } from "react";
import EditSubCategoryDrawer from "./EditSubCategoryDrawer";
import {
  useDeleteSubategoryMutation,
  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/store/features/category/categoryApi";
import SubCategoryDeleteModal from "./SubCategoryDeleteModal";
import { toast } from "react-toastify";
interface SubCategoryProps {
  subCategoryName?: string;
}

const SubCategory = ({ data, id }: any) => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteSubategory, { isLoading: loading }] =
    useDeleteSubategoryMutation();
  const formData = new FormData();

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal((prevState) => !prevState);
  };

  // handle modal
  const handleCloseEditDrawer = () => {
    setOpenEditDrawer(false);
  };

  // handle delete
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    formData.append("deleteSubcategories", data?.subcategoryId);

    const value = {
      data: formData,
      id: id,
      sub: data?.subcategoryId,
    };
    console.log(value);
    try {
      const res = await deleteSubategory({
        data: formData,
        id: id,
      });
      console.log(res);
      handleCloseConfirmationModal();
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        "hover:bg-main-bg-color-opacity-32 transition-all rounded-custom-5px px-3.5 py-3 flex items-center justify-between group cursor-pointer"
      }
    >
      <span className="text-base text-black-opacity-80 group-hover:text-fuchsia-800 transition-all">
        {data?.subcategoryName}
      </span>

      <div className="group-hover:flex items-center gap-3.5 hidden transition-all">
        <button onClick={handleCloseConfirmationModal}>
          <IconTrashX stroke={1} className="text-fuchsia-800" />
        </button>
        <button onClick={() => setOpenEditDrawer(true)}>
          <IconEdit stroke={1} className="text-fuchsia-800" />
        </button>
      </div>

      {openEditDrawer && (
        <EditSubCategoryDrawer
          data={data}
          openDrawer={openEditDrawer}
          // @ts-ignore
          setOpenEditDrawer={setOpenEditDrawer}
          handleCloseDrawer={handleCloseEditDrawer}
        />
      )}

      {openConfirmationModal && (
        <SubCategoryDeleteModal
          loading={loading}
          data={data}
          handleDelete={handleDelete}
          handleModal={handleCloseConfirmationModal}
        />
      )}
    </div>
  );
};

export default SubCategory;
