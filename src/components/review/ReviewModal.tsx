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
import DeleteAuthorReplyModal from "./DeleteAuthorReplyModal";
import DeleteCustomerReviewModal from "./DeleteCustomerReviewModal";

const ReviewModal = ({ openModal, handleCloseModal, id, customerId }: any) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAuthorReply, setDeleteAuthorReply] = useState(false);
  const { data, isLoading } = useReviewQuery(id);
  const { id: isEdited } = useAppSelector((state) => state.reply);
  const { data: customerInfo } = useGetUserByIdQuery(customerId);

  const handleDeleteModal = () => {
    setDeleteModal((prevState) => !prevState);
  };

  const handleAuthorReplyDeleteModal = () => {
    setDeleteAuthorReply((prevState) => !prevState);
  };

  const [deleteReview, { isLoading: loading }] = useDeleteReviewMutation();

  // handle delete
  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      const res = await deleteReview(data?.data?._id);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
      handleDeleteModal();
      handleCloseModal();
    } catch (err: any) {
      console.error(err.message);
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
          {isLoading && <Loader />}
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
              {data?.data?.reply ? (
                <AuthorReply
                  handleDeleteModal={handleAuthorReplyDeleteModal}
                  data={data}
                />
              ) : (
                ""
              )}
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
        <DeleteCustomerReviewModal
          handleModal={handleDeleteModal}
          handleDelete={handleDelete}
          loading={loading}
        />
      )}

      {deleteAuthorReply && (
        <DeleteAuthorReplyModal
          handleModal={handleAuthorReplyDeleteModal}
          data={data}
          handleMainModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReviewModal;
