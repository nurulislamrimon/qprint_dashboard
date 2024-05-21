import { IconEdit, IconTrash } from "@tabler/icons-react";
import { PaperSize } from "./PrintingPaperSize";
import { useState } from "react";
import EditPrintingPaperSizeModal from "./EditPrintingPaperSizeModal";
import DeleteRequesetPrintingModal from "./DeleteRequesetPrintingModal";

type PaperSizeData = {
  data: PaperSize;
};

const PrintingPaperSizeLayout = ({ data }: PaperSizeData) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div className="bg-main-bg-color-opacity-32 bg-opacity-20 shadow-sm hover:shadow-product-card-shadow rounded-t-md">
      <div
        className={`bg-white flex items-center justify-center rounded-md border-fuchsia-200 border transition-all border-transparent relative group`}
        style={{ width: `200px`, height: `150px` }}
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
