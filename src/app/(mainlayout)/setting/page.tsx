"use client";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import PasswordInput from "@/components/shared/PasswordInput";
import TopBar from "@/components/shared/TopBar";
import { IconUpload } from "@tabler/icons-react";
import {
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} from "@/store/features/auth/authApi";
import React, { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setProfilePhotFile,
  setSetting,
} from "@/store/features/auth/settingSlice";
import {
  setConfirmPassword,
  setNewPassword,
  setOldPassword,
} from "@/store/features/auth/updatePasswordSlice";
import FileInput from "@/components/ui/FileInput";
import { mainUrl } from "@/constants/mainUrl";
import Loader from "@/components/shared/loaders/Loader";
import { toast } from "react-toastify";
import CustomGlobalNumberInput from "@/components/shared/CustomGlobalNumberInput";
import { showError } from "@/helpers/showError";
import FileUploader from "@/components/shared/FileUploader/FileUploader";

const Setting = () => {
  const [error, setError] = useState("");
  const { data, isLoading: initialLoading } = useGetMeQuery("");
  const [updateMe, { error: updateError, isLoading: updateLoading }] =
    useUpdateMeMutation();
  const [
    updatePassword,
    { isLoading: updatePasswordLoading, error: updatePasswordError },
  ] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  const updatedData = useAppSelector((state) => state.settingSlice);

  console.log(updatedData);

  const { oldPassword, newPassword, confirmPassword } = useAppSelector(
    (state) => state.updatePasswordSlice
  );

  const loading = initialLoading || updateLoading || updatePasswordLoading;

  const formData = new FormData();

  useLayoutEffect(() => {
    dispatch(setSetting(data?.data));
  }, [data, dispatch]);

  // get the new value

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target?.name;

    // set file
    if (e.target instanceof HTMLInputElement && e.target?.files) {
      const files = e.target?.files;
      if (files && files.length) {
        const objUrl = URL.createObjectURL(files[0]);
        dispatch(setSetting({ [fieldName]: objUrl }));
        dispatch(setProfilePhotFile({ [fieldName]: files[0] }));
      }
    } else {
      const value = e.target.value;
      dispatch(setSetting({ [fieldName]: value }));
    }
  };
  const { fullName, phoneNumber, profilePhotoFile } = updatedData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      formData.append("fullName", fullName as string);
      formData.append("phoneNumber", phoneNumber as string);
      formData.append("profilePhoto", profilePhotoFile?.profilePhoto);

      const res = await updateMe(formData);
      if (res && "data" in res) {
        toast.success(res.data.message);
      }

      const updatePasswordData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
        const pasRes = await updatePassword(updatePasswordData);

        if (pasRes && "data" in pasRes) {
          toast.success(pasRes.data.message);
        }
        console.log(pasRes);

        if (pasRes && "error" in pasRes) {
          setError("Please Check Your Password Input");
          showError(pasRes);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="mb-1">
        <TopBar title={"Setting"} />
      </div>
      <div className="p-5 md:p-8 bg-white  h-[calc(100vh-90px)] overflow-y-auto">
        {loading && <Loader />}
        <h1 className="text-xl font-medium mb-7">Basic Information</h1>
        {/* ==Profile Setting Form== */}
        <div className="">
          <form onSubmit={handleSubmit} action="" className=" w-full md:gap-7 ">
            {/* ==Profile Setting Form== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="w-full md:col-span-2 md:order-none order-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                <CustomGlobalInput
                  name="fullName"
                  label="Full Name"
                  type="text"
                  placeholder="Steven"
                  value={updatedData?.fullName}
                  onChange={handleChange}
                />

                <CustomGlobalInput
                  label="Email"
                  type="email"
                  placeholder="dianne.russell@gmail.com"
                  value={updatedData?.email}
                  disabled={true}
                  className="opacity-50"
                />
                <CustomGlobalNumberInput
                  type="tel"
                  label="Phone Number"
                  name="phoneNumber"
                  value={updatedData?.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="md:order-none order-1">
                <div className=" flex items-center justify-center">
                  <FileUploader
                    name="profilePhoto"
                    className=" h-48 w-48 relative cursor-pointer border  !rounded-full flex flex-col gap-2.5 items-center justify-center  text-center text-black-opacity-60 text-xs overflow-hidden"
                    multiple={true}
                    data={updatedData.profilePhoto}
                    accept="image/jpg,image/jpeg,image/png"
                    onChange={handleChange}
                    maxSize={2}
                  ></FileUploader>
                </div>
              </div>
            </div>
            {/* ===Password=== */}
            <div className="flex flex-col md:gap-10 gap-7">
              <h1 className="text-xl font-medium  ">Change Password</h1>

              <div className="flex flex-col md:flex-row gap-7">
                <PasswordInput
                  onChange={(e) => dispatch(setOldPassword(e.target.value))}
                  label="Current Password"
                  placeholder="Type Password"
                />
                <PasswordInput
                  onChange={(e) => dispatch(setNewPassword(e.target.value))}
                  label="New Password"
                  placeholder="New Password"
                />
                <PasswordInput
                  onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </div>
              {error && <span className="text-red-color ">{error}</span>}
            </div>
            <div className="flex items-center justify-center  mt-5 md:fixed bottom-5 inset-x-0 mx-auto">
              <ShopSetupCommonSubmitBTN
                buttonText="Update Profile"
                type="submit"
                submitBTNStyle={""}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
