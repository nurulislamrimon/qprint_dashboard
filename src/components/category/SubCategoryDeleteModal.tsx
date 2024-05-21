import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconTrash } from "@tabler/icons-react";
import GlobalActionButton from "../shared/GlobalActionButton";
import Loader from "../shared/loaders/Loader";

const SubCategoryDeleteModal = ({
  data,
  handleDelete,
  handleModal,
  loading,
}: any) => {
  // console.log(data);
  return (
    <div>
      <CustomGlobalModal
        setOpenModal={handleModal}
        isVisible={handleModal}
        mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
      >
        <form onSubmit={handleDelete}>
          <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center relative overflow-hidden">
            {loading && <Loader />}
            <div>
              <IconTrash width={50} height={50} color="red" stroke={1.5} />
            </div>
            <span className="text-center">
              Are you sure? <br /> Want to delete{" "}
              <span className="font-semibold">{data?.subcategoryName}</span>.
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

export default SubCategoryDeleteModal;
