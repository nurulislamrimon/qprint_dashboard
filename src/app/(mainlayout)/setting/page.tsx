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
import { setSetting } from "@/store/features/auth/settingSlice";
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

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(error);
  const { data } = useGetMeQuery("");
  const [updateMe] = useUpdateMeMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  const updatedData = useAppSelector((state) => state.settingSlice);
  console.log(updatedData);
  const { oldPassword, newPassword, confirmPassword } = useAppSelector(
    (state) => state.updatePasswordSlice
  );

  // console.log(updatedData);

  const formData = new FormData();

  useLayoutEffect(() => {
    dispatch(setSetting(data?.data));
  }, [data, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      Object.entries(updatedData).forEach(([key, value]) => {
        if (key !== "email") {
          if (typeof value !== "string") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });
      const res = await updateMe(formData);
      // @ts-ignore
      toast.success(res?.data?.message);

      // update password

      const updatePasswordData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
        const pasRes = await updatePassword(updatePasswordData);
        // @ts-ignore
        toast.success(pasRes?.data?.message);
        console.log(pasRes);
        // @ts-ignore
        if (pasRes?.error?.data?.message) {
          // @ts-ignore
          setError(pasRes?.error?.data?.message);
          // @ts-ignore
          toast.error(pasRes?.error?.data?.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                  onChange={(e) =>
                    dispatch(setSetting({ [e.target.name]: e.target.value }))
                  }
                />

                <CustomGlobalInput
                  label="Email"
                  type="email"
                  placeholder="dianne.russell@gmail.com"
                  value={updatedData?.email}
                  disabled={true}
                  className="opacity-50"
                />
                <CustomGlobalInput
                  label="Phone Number"
                  type="number"
                  placeholder="+974"
                  value={updatedData?.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) =>
                    dispatch(setSetting({ [e.target.name]: e.target.value }))
                  }
                />

                <CustomGlobalNumberInput
                  label="Phone Number"
                  type="number"
                  placeholder="+974"
                  name="phoneNumber"
                  value={updatedData?.phoneNumber}
                  onChange={(e) =>
                    dispatch(setSetting({ [e.target.name]: e.target.value }))
                  }
                />
              </div>

              <div className="md:order-none order-1">
                <div className=" flex items-center justify-center">
                  <FileInput
                    imageType="Profile"
                    className="!rounded-full !border-solid"
                    name="profilePhoto"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target?.files?.length) {
                        dispatch(
                          setSetting({ [e.target.name]: e.target?.files[0] })
                        );
                        // create image url using file value
                        const reader = URL.createObjectURL(e.target?.files[0]);

                        dispatch(setSetting({ localProfilePhotoUrl: reader }));
                      }
                    }}
                    imageBottomText=""
                    localUrl={
                      updatedData?.localProfilePhotoUrl === undefined
                        ? `${mainUrl}${updatedData?.profilePhoto}`
                        : updatedData?.localProfilePhotoUrl
                    }
                  />
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
