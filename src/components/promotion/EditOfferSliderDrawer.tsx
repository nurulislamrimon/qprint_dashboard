import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import GlobalActionButton from "../shared/GlobalActionButton";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import ColorAndImageSwitcher from "./card/ColorAndImageSwitcher";
import { useAddSliderMutation } from "@/store/features/slider/sliderApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import FileInput from "../ui/FileInput";
import {
  IOffer,
  resetOffer,
  setOffer,
  setOfferFiles,
} from "@/store/features/slider/offerSlice";
import Loader from "../shared/loaders/Loader";
import { showError } from "@/helpers/showError";
import FileUploader from "../shared/FileUploader/FileUploader";

const EditOfferSliderDrawer = ({ data }: { data: IOffer | any }) => {
  const [addSlider, { isLoading: loading }] = useAddSliderMutation();
  const formData = new FormData();
  const dispatch = useAppDispatch();

  // ---------------------
  // handle change
  // ---------------------
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
        dispatch(setOffer({ [fieldName]: objUrl }));
        dispatch(setOfferFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value =
        fieldName === "isBgColorSelected"
          ? !data?.isBgColorSelected
          : e.target?.value;

      dispatch(setOffer({ [fieldName]: value }));
    }
  };

  // ---------------------
  // submit form
  // ---------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { offerFiles, offerTitle, isBgColorSelected, ...rest } = data;
      const restFiles = { ...offerFiles };

      if (
        !isBgColorSelected &&
        rest?.backgroundPhoto &&
        rest?.backgroundColor
      ) {
        rest?.backgroundColor && delete rest.backgroundColor;
      } else if (
        isBgColorSelected &&
        rest?.backgroundColor &&
        rest?.backgroundPhoto
      ) {
        rest?.backgroundPhoto && delete rest.backgroundPhoto;
        restFiles?.backgroundPhoto && delete restFiles.backgroundPhoto;
      }

      formData.append(offerTitle, JSON.stringify(rest));

      // handle file uploads
      if (restFiles && Object.keys(restFiles)?.length) {
        Object.entries(restFiles).forEach(([key, value]) => {
          formData.append(`${offerTitle}.${key}`, value as string);
        });
      }
      const res = await addSlider(formData);

      if ("data" in res) {
        toast.success((res as { data: any }).data.message);
        dispatch(resetOffer());
      }
      if ("error" in res) {
        showError((res as { error: any }).error);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        childrenClassName="overflow-y-scroll"
        modalWidthControlClassName="w-full md:w-[500px]"
        isVisible={Object.keys(data).length ? true : false}
      >
        <form onSubmit={handleSubmit} className="overflow-hidden">
          {loading && <Loader />}
          <div className="relative overflow-y-auto p-3.5 flex flex-col gap-3.5">
            <span className="font-medium text-lg">{data?.offerTitle}</span>
            <div className="absolute right-2.5 top-2.5">
              <DrawerModalCloseBTN handleClose={() => dispatch(resetOffer())} />
            </div>

            <ColorAndImageSwitcher handleChange={handleChange} data={data} />

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">
              <FileUploader
                name="productPhoto"
                className="min-h-48  h-full min-w-48 w-full relative cursor-pointer  flex items-center justify-center text-black-opacity-60 text-xs "
                data={data?.productPhoto}
                multiple={true}
                onChange={handleChange}
                accept="image/jpg,image/jpeg,image/png"
                maxSize={2}
              ></FileUploader>

              <div className="grid grid-cols-1 gap-2">
                <CustomGlobalInput
                  value={data?.title}
                  label="Title"
                  name="title"
                  placeholder="Type here"
                  onChange={(e) =>
                    dispatch(setOffer({ [e.target.name]: e.target.value }))
                  }
                />

                <CustomGlobalInput
                  label="Price"
                  type="number"
                  value={data?.price}
                  onChange={(e) =>
                    dispatch(setOffer({ [e.target.name]: e.target.value }))
                  }
                  name="price"
                  placeholder="Type here"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3.5 ">
              <CustomGlobalInput
                label="Button Text"
                placeholder="Shop Now"
                name="buttonText"
                value={data?.buttonText}
                onChange={(e) =>
                  dispatch(setOffer({ [e.target.name]: e.target.value }))
                }
              />
              <CustomGlobalInput
                containerStyle="col-span-2"
                label="Link"
                placeholder="https://www.link.com"
                name="link"
                value={data?.link}
                onChange={(e) =>
                  dispatch(setOffer({ [e.target.name]: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-5 justify-end">
              <GlobalActionButton
                type="reset"
                buttonStyleClassName="px-6 py-3 "
                buttonText="Reset"
              />
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Submiting..." : "Submit"}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </CustomGlobalDrawer>
    </div>
  );
};

export default EditOfferSliderDrawer;
