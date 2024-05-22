import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import { IconStar, IconTrash, IconAlertTriangle } from "@tabler/icons-react";
import ReplySendBTN from "./ReplySendBTN";
import Image from "next/image";
import {
  useDeleteReviewMutation,
  useReviewQuery,
} from "@/store/features/review/reviewApi";
import { mainUrl } from "@/constants/mainUrl";
import { getDateFormat } from "@/utils/getDateFormat";
import AuthorReply from "./AuthorReply";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import imgPlaceholder from "@/assets/placeholderImgIcon.svg";
import personPlaceholder from "@/assets/personPlaceholder.png";
import { useState } from "react";
import Loader from "../shared/loaders/Loader";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import GlobalActionButton from "../shared/GlobalActionButton";
import { toast } from "react-toastify";
import { useGetUserByIdQuery } from "@/store/features/users/usersApi";
import { useAppSelector } from "@/store/hook";

const ReviewModal = ({ openModal, handleCloseModal, id, customerId }: any) => {
  const { data, isLoading } = useReviewQuery(id);
  const { reply, id: isEdited } = useAppSelector((state) => state.reply);

  const { data: customerInfo } = useGetUserByIdQuery(customerId);

  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModal((prevState) => !prevState);
  };

  const [deleteReview] = useDeleteReviewMutation();

  // handle delete
  const handleDelete = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await deleteReview(data?.data?._id);
      if (res?.data) {
        toast.success(res?.data?.message);
        setDeleteModal(false);
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
      handleDeleteModal();
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        isVisible={openModal}
        setOpenDrawer={handleCloseModal}
        modalWidthControlClassName="w-full md:w-[500px]"
      >
        <div className="p-5 overflow-hidden">
          <div className="flex justify-between items-center mb-[30px]">
            <span className="text-black-opacity-50 text-lg">Review</span>

            <DrawerModalCloseBTN handleClose={handleCloseModal} />
          </div>
          {/* ==Order Informaion== */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <div className="w-[75px] h-[75px] p-2 border rounded-md shrink-0 relative overflow-hidden ">
                <Image
                  src={
                    isLoading
                      ? imgPlaceholder
                      : `${mainUrl}${data?.data?.product?.productPhoto}`
                  }
                  alt="profile"
                  objectFit="cover"
                  fill
                  className="w-full h-full p-2 top-0 left-0 object-cover "
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg line-clamp-2 leading-tight">
                  {data?.data?.product?.productName}
                </span>
                <span className="text-sm text-black-opacity-50">
                  {data?.data?.product?.brandName}
                </span>
              </div>
            </div>
            <hr className="w-full h-[1px] my-5" />
            <div className="flex items-center justify-between mb-[30px]">
              <div className="shrink-0">
                <div className="flex items-center gap-5">
                  <div className="w-[45px] h-[45px] relative border rounded-full">
                    <Image
                      src={
                        isLoading
                          ? personPlaceholder
                          : customerInfo?.data?.profilePhoto
                          ? `${mainUrl}${customerInfo?.data?.profilePhoto}`
                          : personPlaceholder
                      }
                      alt="customer-photo"
                      objectFit="cover"
                      fill
                      className="w-full h-full rounded-full top-0 left-0 object-cover "
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-lg">
                      {data?.data?.reviewer?.fullName}
                    </span>
                    <span className="text-xs text-black-opacity-60">
                      {getDateFormat(data?.data?.createdAt)}
                    </span>
                  </div>
                </div>
                {/* ==rating== */}
                <div className="flex items-center gap-1.5 mt-5">
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`
                  ${
                    starIndex < data?.data?.rating
                      ? "text-[#EDAB00]"
                      : "text-[#ccc] bg-transparent"
                  }
                `}
                    >
                      <IconStar
                        className={isLoading && "animate-pulse"}
                        fill={
                          starIndex < data?.data?.rating
                            ? "#EDAB00"
                            : "currentColor"
                        }
                        width={16}
                        height={16}
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 border p-2 rounded-md">
                <span>
                  <IconTrash stroke={1} width={16} height={16} />
                </span>
                <button
                  onClick={() => handleDeleteModal()}
                  className="text-sm text-black-opacity-70"
                >
                  Delete Review
                </button>
              </div>
            </div>
            <p className="text-sm text-black-opacity-60 whitespace-pre-wrap">
              {data?.data?.comment}
            </p>

            {/* ==Author Reply== */}

            <div className="mt-7 ml-5">
              {data?.data?.reply ? <AuthorReply data={data} /> : ""}
            </div>
          </div>
          {/* ==Author Reply Button== */}
          {(!data?.data?.reply || isEdited === data?.data?.id) && (
            <div
              className={`fixed bottom-2 mx-auto md:w-[460px] w-[calc(100vw-40px)]`}
            >
              <ReplySendBTN id={id} />
              <span className="text-black-opacity-50 italic text-sm">
                This reply will be on product view page
              </span>
            </div>
          )}
        </div>
      </CustomGlobalDrawer>
      {deleteModal && (
        <CustomGlobalModal
          isVisible={handleDeleteModal}
          setOpenModal={handleDeleteModal}
          mainClassName="w-[450px]"
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
                <span className="text-lg">
                  Are you sure, delete this review?
                </span>
                <div className="flex items-center justify-center gap-10">
                  <button
                    onClick={() => handleDeleteModal()}
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
      )}
    </div>
  );
};

export default ReviewModal;
