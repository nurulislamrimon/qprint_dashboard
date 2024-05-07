"use client";
import { useState } from "react";
import UsersCard, { UserInformationProps } from "./UsersCard";
import UsersCommonSubmitBTN from "./UsersCommonSubmitBTN";
import {
  useGetAdminQuery,
  useGetManagerQuery,
} from "@/store/features/users/usersApi";
import AddUserModal from "./AddUserModal";
import { useGetMeQuery } from "@/store/features/auth/authApi";
import UserCardSkeleton from "../shared/skeleton/UserCardSkeleton";

const UserPageContent = () => {
  const { data: allAdmin, isLoading } = useGetAdminQuery("");
  const { data: allManger } = useGetManagerQuery("");
  const { data: userData } = useGetMeQuery("");

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div className="p-5 md:p-8 md:h-[calc(100vh-90px)] overflow-y-auto bg-white mt-1">
      {/* ==User Details== */}

      {/* admin  */}
      <div className="mb-10">
        <h1 className="text-xl mb-5">Admin</h1>
        <div className="user-card-grid-responsive gap-7 ">
          {isLoading
            ? [...Array(10)].map((_, index) => {
                return <UserCardSkeleton key={index} />;
              })
            : allAdmin?.data?.map(
                (data: UserInformationProps, index: number) => (
                  <UsersCard key={index} data={data} />
                )
              )}
        </div>
      </div>
      {/* manager */}
      <div className="mb-10">
        <h1 className="text-xl mb-5">Manager</h1>
        <div className="user-card-grid-responsive gap-7 ">
          {isLoading
            ? [...Array(10)].map((_, index) => {
                return <UserCardSkeleton key={index} />;
              })
            : allManger?.data?.map(
                (data: UserInformationProps, index: number) => (
                  <UsersCard key={index} data={data} />
                )
              )}
        </div>
      </div>

      <div
        onClick={(e) => setOpenModal(true)}
        className=" flex items-center justify-center mt-10 md:w-[400px] w-full  md:fixed bottom-5 inset-x-0 md:mx-auto"
      >
        {userData?.data?.role === "Admin" && (
          <UsersCommonSubmitBTN
            containerStyle="md:w-[400px]"
            type="submit"
            buttonText="Add New User"
          />
        )}
      </div>

      {openModal && <AddUserModal handleModal={handleClose}></AddUserModal>}
    </div>
  );
};

export default UserPageContent;
