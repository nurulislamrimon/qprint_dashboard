import CustomGlobalModal from "../shared/CustomGlobalModal";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import UsersCommonSubmitBTN from "./UsersCommonSubmitBTN";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
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
import { useCreateAdministratorMutation } from "@/store/features/users/usersApi";
import FileInput from "../ui/FileInput";
import { mainUrl } from "@/constants/mainUrl";
import { useState } from "react";
import Loader from "../shared/loaders/Loader";

const AddUserModal = ({ handleModal }: any) => {
  const dispatch = useAppDispatch();
  const {
    fullName,
    email,
    password,
    phoneNumber,
    role,
    confirmPassword,
    profilePhoto: profilePhoto,
    userLocalUrl,
  } = useAppSelector((state) => state.userAdminSlice);
  const [createAdministrator] = useCreateAdministratorMutation();

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

  const [loading, setLoading] = useState(false);

  const formData = new FormData();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    // data appended
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", role);
    formData.append("profilePhoto", profilePhoto as File);

    try {
      const res = await createAdministrator(formData);
      if (res && "data" in res && res.data.message) {
        toast.success(res.data.message);
        handleModal();
      }
      dispatch(clearUserData());
    } catch (error) {
      console.error("validation error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal}
        setOpenModal={handleModal}
        mainClassName="md:w-[780px] md:h-auto w-full h-full overflow-y-auto"
      >
        <div className="relative md:p-[30px] p-5 overflow-hidden ">
          {loading && <Loader />}
          <div className="absolute right-5 top-5">
            <DrawerModalCloseBTN handleClose={handleModal} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div>
                <FileInput
                  className="!border-solid !rounded-full"
                  name="userPhoto"
                  onChange={handleFileChange}
                  imageBottomText=""
                  localUrl={userLocalUrl}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomGlobalInput
                onChange={(e) => dispatch(setFullName(e.target.value))}
                label="Full name"
                type="text"
                name="fullName"
              />
              <CustomGlobalInput
                onChange={(e) => dispatch(setEmail(e.target.value))}
                label="Email"
                type="email"
                name="email"
              />
              <CustomGlobalInput
                onChange={(e) => dispatch(setAdminPhoneNumber(e.target.value))}
                label="Phone Number"
                type="number"
                name="phoneNumber"
              />
              <CustomGlobalInput
                onChange={(e) => dispatch(setPassword(e.target.value))}
                label="Password"
                type="password"
                name="password"
              />
              <CustomGlobalInput
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                label="Confirm Password"
                type="password"
                name="confirmPassword"
              />
              <div className="md:col-span-2 border px-5 py-3 rounded-custom-5px">
                <select
                  className="w-full outline-none cursor-pointer"
                  name="role"
                  onChange={(e) => dispatch(setRole(e.target.value))}
                >
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="md:col-span-2 ">
                <UsersCommonSubmitBTN type="submit" buttonText="Add New User" />
              </div>
            </div>
          </form>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default AddUserModal;
