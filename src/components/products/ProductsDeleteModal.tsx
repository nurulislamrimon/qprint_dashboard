import { IconTrash } from "@tabler/icons-react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import GlobalActionButton from "../shared/GlobalActionButton";
import Loader from "../shared/loaders/Loader";

const ProductsDeleteModal = ({
  handleClose,
  openDeleteModal,
  productDeleteHandler,
  data,
  loading,
}: any) => {
  console.log(data?._id);
  return (
    <div>
      <CustomGlobalModal
        setOpenModal={handleClose}
        isVisible={openDeleteModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center relative overflow-hidden">
          {loading && <Loader />}
          <div>
            <IconTrash width={50} height={50} color="red" stroke={1.5} />
          </div>
          <span>
            Are you sure? <b>Delete this product</b>.
          </span>
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleClose()}
              className="px-10 py-2.5 border rounded-custom-5px"
            >
              No
            </button>
            <div onClick={() => productDeleteHandler(data?._id)}>
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

export default ProductsDeleteModal;
