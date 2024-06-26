import { useAppDispatch, useAppSelector } from "@/store/hook";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import UsersCommonSubmitBTN from "./UsersCommonSubmitBTN";
import {
  useGetUserByIdQuery,
  useUpdateAdministratorsMutation,
} from "@/store/features/users/usersApi";
import { useLayoutEffect, useState } from "react";
import {
  clearUserData,
  setAdminPhoneNumber,
  setConfirmPassword,
  setEmail,
  setFullName,
  setPassword,
  setRole,
  setUserLocalUrl,
  setProfilePhoto,
} from "@/store/features/users/userSlice";
import { toast } from "react-toastify";
import FileInput from "../ui/FileInput";
import { mainUrl } from "@/constants/mainUrl";
import Loader from "../shared/loaders/Loader";

const UpdateUserModal = ({ openModal, setOpenModal, handleClose, id }: any) => {
  const dispatch = useAppDispatch();
  const { fullName, email, phoneNumber, role, profilePhoto, userLocalUrl } =
    useAppSelector((state) => state.userAdminSlice);

  const [updateAdministrators, { error: updateError, isLoading: loading }] =
    useUpdateAdministratorsMutation();

  const { data, isLoading: userUpdating } = useGetUserByIdQuery(id);

  // handle loader

  // get existing data
  useLayoutEffect(() => {
    dispatch(setFullName(data?.data?.fullName));
    dispatch(setEmail(data?.data?.email));
    dispatch(setPassword(data?.data?.password));
    dispatch(setConfirmPassword(data?.data?.confirmPassword));
    dispatch(setAdminPhoneNumber(data?.data?.phoneNumber));
    dispatch(setRole(data?.data?.role));
    dispatch(setProfilePhoto(data?.data?.profilePhoto));
  }, [data, dispatch]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      dispatch(setProfilePhoto(selectedFile));
    }
    if (event.target.files && event.target.files.length > 0) {
      const reader = URL.createObjectURL(event.target.files[0]);
      dispatch(setUserLocalUrl(reader));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      role: role,
      profilePhoto: profilePhoto,
      fullName: fullName,
      phoneNumber: phoneNumber,
    };

    try {
      const res = await updateAdministrators({ data, id });

      if (res && "data" in res) {
        toast.success(res.data.message);
        handleClose();
      }
      if (
        res &&
        "error" in res &&
        res.error !== null &&
        typeof res.error === "object" &&
        "message" in res.error
      ) {
        toast.error(res.error.message as React.ReactNode);
      }
      dispatch(clearUserData());
    } catch (error) {
      console.error("validation error", error);
    }
  };
  const spinner = loading || userUpdating;
  return (
    <div>
      <CustomGlobalModal
        isVisible={openModal}
        setOpenModal={setOpenModal}
        mainClassName="md:w-[780px] w-full md:h-auto h-full overflow-y-auto"
      >
        <div className="relative md:p-[30px] p-5 overflow-hidden">
          {spinner && <Loader />}
          <div className="absolute right-5 top-5">
            <DrawerModalCloseBTN handleClose={handleClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div>
                <FileInput
                  imageType="Profile"
                  className="!border-solid !rounded-full"
                  name="userPhoto"
                  onChange={handleFileChange}
                  imageBottomText=""
                  localUrl={
                    userLocalUrl === ""
                      ? `${mainUrl}${profilePhoto}`
                      : userLocalUrl
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomGlobalInput
                value={fullName}
                label="Full name"
                type="text"
                name="fullName"
              />
              <CustomGlobalInput
                containerStyle="opacity-60"
                disabled
                value={email}
                label="Email"
                type="email"
                name="email"
              />
              <CustomGlobalInput
                value={phoneNumber}
                label="Phone Number"
                type="number"
                name="phoneNumber"
              />

              <div className="md:col-span-2 border px-5 py-3 rounded-custom-5px">
                <select
                  value={role}
                  className="w-full outline-none cursor-pointer"
                  name="role"
                  onChange={(e) => dispatch(setRole(e.target.value))}
                >
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <UsersCommonSubmitBTN type="submit" buttonText="Update User" />
              </div>
            </div>
          </form>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default UpdateUserModal;
