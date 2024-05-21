import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import ColorAndImageSwitcher from "./card/ColorAndImageSwitcher";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonSecondary from "../ui/btn/ButtonSecondary";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { useAppDispatch } from "@/store/hook";
import { useAddSliderMutation } from "@/store/features/slider/sliderApi";
import { toast } from "react-toastify";
import {
  resetSlider,
  setSlider,
  setSliderFiles,
} from "@/store/features/slider/sliderSlice";
import Loader from "../shared/loaders/Loader";
import FileUploader from "../shared/FileUploader/FileUploader";
import { showError } from "@/helpers/showError";

const AddNewSliderDrawer = ({ data }: any) => {
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
        dispatch(setSlider({ [fieldName]: objUrl }));
        dispatch(setSliderFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value =
        fieldName === "isBgColorSelected"
          ? !data?.isBgColorSelected
          : e.target?.value;

      dispatch(setSlider({ [fieldName]: value }));
    }
  };

  // ---------------------
  // submit form
  // ---------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { sliderFiles, sliderTitle, isBgColorSelected, ...rest } = data;
      const restFiles = { ...sliderFiles };

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

      formData.append(`slider.${sliderTitle}`, JSON.stringify(rest));

      // handle file uploads
      if (restFiles && Object.keys(restFiles)?.length) {
        Object.entries(restFiles).forEach(([key, value]) => {
          formData.append(`slider.${sliderTitle}.${key}`, value as string);
        });
      }

      const res = await addSlider(formData);

      if ("data" in res) {
        toast.success((res as { data: any }).data.message);
        dispatch(resetSlider());
      }
      if ("error" in res) {
        showError((res as { error: any }).error.message);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div>
      <CustomGlobalDrawer
        childrenClassName="overflow-y-scroll"
        isVisible={Object.keys(data).length ? true : false}
      >
        {/* main container */}
        <form
          onSubmit={handleSubmit}
          className=" p-5 overflow-y-auto overflow-hidden"
        >
          {loading && <Loader />}
          {/* top section */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{data?.sliderTitle} </h3>

            <DrawerModalCloseBTN handleClose={() => dispatch(resetSlider())} />
          </div>

          {/* main section */}

          {/* Image and color picker */}

          <ColorAndImageSwitcher handleChange={handleChange} data={data} />

          {/* input section */}
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-4 items-center justify-center w-full md:flex-row  flex-col">
              <div className="">
                <FileUploader
                  name="productPhoto"
                  className="min-h-48 flex items-center justify-center flex-col h-full min-w-full relative cursor-pointer text-black-opacity-60 text-xs"
                  data={data?.productPhoto}
                  multiple={true}
                  onChange={handleChange}
                  accept="image/jpg,image/jpeg,image/png"
                  maxSize={2}
                ></FileUploader>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <CustomGlobalInput
                  label="Tag"
                  type="text"
                  placeholder="Type here"
                  name="sliderTag"
                  value={data?.sliderTag}
                  onChange={(e) =>
                    dispatch(setSlider({ [e.target.name]: e.target.value }))
                  }
                />
                <CustomGlobalInput
                  label="Title"
                  type="text"
                  placeholder="Type here"
                  name="title"
                  value={data?.title}
                  onChange={(e) =>
                    dispatch(setSlider({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid items-center justify-center  gap-5 md:grid-cols-3 grid-cols-1  ">
              <CustomGlobalInput
                label="Price (Optional)"
                type="number"
                placeholder="$00"
                name="price"
                value={data?.price}
                onChange={(e) =>
                  dispatch(setSlider({ [e.target.name]: e.target.value }))
                }
              />
              <CustomGlobalInput
                label="Discount (%)"
                type="number"
                placeholder="00 %"
                name="discountPercentage"
                value={data?.discountPercentage}
                onChange={(e) =>
                  dispatch(setSlider({ [e.target.name]: e.target.value }))
                }
              />
              <CustomGlobalInput
                label="Discounted Amount"
                type="number"
                placeholder="$15"
                name="discountedAmount"
                // value={discountedPrice}

                onChange={(e) =>
                  dispatch(setSlider({ [e.target.name]: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center justify-center  gap-5 md:flex-row flex-col mt-10 ">
              <CustomGlobalInput
                label="Description"
                type="textarea"
                placeholder="Type here"
                textareaLength={170}
                name="description"
                value={data?.description}
                onChange={(e) =>
                  dispatch(setSlider({ [e.target.name]: e.target.value }))
                }
              />
            </div>

            <div className="flex w-full gap-5   overflow-hidden ">
              <div className="md:w-3/12 w-4/12">
                <CustomGlobalInput
                  label="Button Text"
                  type="text"
                  placeholder="Shop Now"
                  name="buttonText"
                  value={data?.buttonText}
                  onChange={(e) =>
                    dispatch(setSlider({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
              <div className="w-full ">
                <CustomGlobalInput
                  label="Link"
                  type="text"
                  placeholder="https://"
                  name="link"
                  value={data?.link}
                  onChange={(e) =>
                    dispatch(setSlider({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="w-full flex  items-center lg:justify-end justify-center gap-5 my-10 ">
              <ButtonSecondary buttonText="Reset" type="reset" />
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Submitting.." : "Submit"}
              />
            </div>
          </div>
        </form>
      </CustomGlobalDrawer>
    </div>
  );
};

export default AddNewSliderDrawer;
