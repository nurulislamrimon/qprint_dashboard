import { IconEdit, IconTrash } from "@tabler/icons-react";
import { PaperSize } from "./PrintingPaperSize";
import { useDeletePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import { useState } from "react";
import PrintingPaperSizeModal from "./PrintingPaperSizeModal";
import EditPrintingPaperSizeModal from "./EditPrintingPaperSizeModal";
import { toast } from "react-toastify";
import DeleteRequesetPrintingModal from "./DeleteRequesetPrintingModal";

type PaperSizeData = {
  data: PaperSize;
};

const PrintingPaperSizeLayout = ({ data }: PaperSizeData) => {
  const [deletePrintingSetup] = useDeletePrintingSetupMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  //handle delete
  const handleDelete = async (id: string) => {
    const res = await deletePrintingSetup(id);

    if (res?.data) {
      toast.success(res?.data?.message);
    }
    if (res?.error) {
      toast.error(res?.error?.message);
    }
  };

  return (
    <div className="bg-main-bg-color-opacity-32 bg-opacity-20 shadow-sm hover:shadow-product-card-shadow rounded-t-md">
      <div
        className={`bg-white flex items-center justify-center rounded-md hover:border-fuchsia-200 border transition-all border-transparent relative group`}
        style={{ width: `${data?.width * 20}px`, height: `150px` }}
      >
        {/* ==Delete & Edit BTN== */}
        <div className="group-hover:inline-flex flex items-center gap-2 md:hidden absolute right-3.5 top-2.5 group-hover:duration-500">
          <button onClick={() => handleDeleteModal()}>
            <IconTrash width={15} height={15} stroke={1} color="#FF0046" />
            {""}
          </button>
          <button onClick={() => setOpenModal(true)}>
            <IconEdit width={15} height={15} stroke={1} color="#0D9755" />
            {""}
          </button>
        </div>
        <span className="text-sm md:text-lg">
          W:{data?.width} x H:{data?.height}
        </span>
      </div>

      {openDeleteModal && (
        <DeleteRequesetPrintingModal
          handleDelete={() => handleDelete(data?._id)}
          id={data?._id}
          handleModal={handleDeleteModal}
        />
      )}
      {openModal && (
        <EditPrintingPaperSizeModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          id={data?._id}
        />
      )}
    </div>
  );
};

export default PrintingPaperSizeLayout;
