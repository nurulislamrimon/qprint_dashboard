"use client";
import { IconTrashX, IconUserEdit } from "@tabler/icons-react";
import Image from "next/image";
import userCheckIcon from "@/assets/user-check.svg";
import { mainUrl } from "@/constants/mainUrl";
import { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { useDeleteAdminMutation } from "@/store/features/users/usersApi";
import UserDeleteModal from "./UserDeleteModal";
import { toast } from "react-toastify";
import { useGetMeQuery } from "@/store/features/auth/authApi";
import imgPlaceholder from "@/assets/personPlaceholder.png";

export interface UserInformationProps {
  _id: string;
  fullName: string;
  role: string;
  profilePhoto: string;
}

interface UsersCardProps {
  data: UserInformationProps;
}

const UsersCard = ({ data }: UsersCardProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: userData } = useGetMeQuery("");

  const handleClose = () => {
    setOpenModal(false);
  };

  // delete confirmaton modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal((prevState) => !prevState);
  };

  return (
    <div>
      <div className="hover:shadow-product-card-shadow w-[calc(260px,2vw,165px)] h-[calc(220px,2vw,185px)] rounded-lg relative flex items-center justify-center p-5 border">
        {userData?.data?.role === "Admin" && (
          <div className="absolute right-5 top-5 flex flex-col gap-5 ">
            <button onClick={(e) => setOpenModal(true)}>
              {""}
              <IconUserEdit stroke={1} width={20} height={20} />
            </button>

            <button onClick={(e) => setOpenDeleteModal(true)}>
              {""}
              <IconTrashX stroke={1} width={20} height={20} />
            </button>
          </div>
        )}
        <div className="flex flex-col gap-3 md:gap-5 items-center justify-center">
          <div className="w-[70px] h-[70px] relative shrink-0">
            <Image
              src={
                data?.profilePhoto
                  ? `${mainUrl}${data?.profilePhoto}`
                  : imgPlaceholder
              }
              placeholder="blur"
              blurDataURL={`${mainUrl}${data?.profilePhoto}`}
              alt="admin profile"
              className="rounded-full object-cover border-dashed border"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 80px) 5vw, 10vw"
              priority
            />
            <span
              className={`flex items-center justify-center absolute -bottom-4 right-2 ${
                data?._id === userData?.data?._id ? "block" : "hidden"
              }`}
            >
              <Image src={userCheckIcon} alt="check image" />
            </span>
          </div>

          <p className="[font-size:_clamp(15px,2vw,18px)] font-medium">
            {data?.fullName}
          </p>
          <span className="text-sm text-black-opacity-50">{data?.role}</span>
        </div>
      </div>
      {openModal && (
        <UpdateUserModal
          openModal={openModal}
          handleClose={handleClose}
          setOpenModal={setOpenModal}
          id={data?._id}
        />
      )}
      {openDeleteModal && (
        <UserDeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          handleModal={handleCloseDeleteModal}
          id={data?._id}
          data={data}
        />
      )}
    </div>
  );
};

export default UsersCard;
