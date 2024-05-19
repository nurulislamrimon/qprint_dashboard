import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import GlobalActionButton from "../shared/GlobalActionButton";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import ChooseColorOrImage from "./card/ChooseColorOrImage";
import { useAddSliderMutation } from "@/store/features/slider/sliderApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import FileInput from "../ui/FileInput";
import { resetOffer, setOffer } from "@/store/features/slider/offerSlice";
import { useState } from "react";
import Loader from "../shared/loaders/Loader";
import { mainUrl } from "@/constants/mainUrl";
const EditOfferSliderDrawer = (data: any) => {
  const [addSlider] = useAddSliderMutation();
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    formData.append(`${data?.data?.offer}`, JSON.stringify(data?.data));

    try {
      const res = await addSlider(formData);
      console.log("slieder got updated", res);

      if ("data" in res) {
        toast.success((res as { data: any }).data.message);
        dispatch(resetOffer());
      }
      if ("error" in res) {
        toast.error((res as { error: any }).error.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            <span className="font-medium text-lg">
              {data?.data?.offerTitle}
            </span>
            <div className="absolute right-2.5 top-2.5">
              <DrawerModalCloseBTN handleClose={() => dispatch(resetOffer())} />
            </div>

            <ChooseColorOrImage />

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">
              <FileInput
                name="productPhoto"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target?.files?.length) {
                    formData.append(
                      `${data?.data?.offer}.productPhoto`,
                      e.target?.files[0]
                    );
                    // create image url using file value
                    const reader = URL.createObjectURL(e.target?.files[0]);
                    dispatch(setOffer({ offerLocalPhotoUrl: reader }));
                  }
                }}
                imageBottomText=""
                localUrl={
                  data?.data?.offerLocalPhotoUrl === undefined
                    ? `${mainUrl + data?.data?.productPhoto} `
                    : data?.data?.offerLocalPhotoUrl
                }
              />

              <div className="grid grid-cols-1 gap-2">
                <CustomGlobalInput
                  value={data?.data?.title}
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
                  value={data?.data?.price}
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
                value={data?.data?.buttonText}
                onChange={(e) =>
                  dispatch(setOffer({ [e.target.name]: e.target.value }))
                }
              />
              <CustomGlobalInput
                containerStyle="col-span-2"
                label="Link"
                placeholder="https://www.link.com"
                name="link"
                value={data?.data?.link}
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
