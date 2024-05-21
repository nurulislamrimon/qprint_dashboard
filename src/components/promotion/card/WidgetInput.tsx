import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import FileUploader from "@/components/shared/FileUploader/FileUploader";
import Loader from "@/components/shared/loaders/Loader";
import FileInput from "@/components/ui/FileInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import ButtonSecondary from "@/components/ui/btn/ButtonSecondary";
import { useAddDealsOfTheDayAndWidgetMutation } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import {
  setDeals,
  setWidgetFiles,
} from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import { useAppDispatch } from "@/store/hook";
import { useState } from "react";
import { toast } from "react-toastify";

const WidgetInput = (data: any) => {
  const dispatch = useAppDispatch();
  const [addWidget] = useAddDealsOfTheDayAndWidgetMutation();
  const formData = new FormData();
  const [loading, setLoading] = useState(false);

  // File and input handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target?.name;

    if (e.target instanceof HTMLInputElement && e.target?.files) {
      const files = e.target?.files;
      if (files && files.length) {
        const objUrl = URL.createObjectURL(files[0]);

        dispatch(setDeals({ [fieldName]: objUrl }));
        dispatch(setWidgetFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value = e.target.value;
      dispatch(setDeals({ [fieldName]: value }));
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append("widget", JSON.stringify(data?.data));
    if (data?.data?.widgetFile) {
      formData.append(
        "widget.productPhoto",
        data?.data?.widgetFile.productPhoto
      );
    }

    setLoading(true);
    try {
      const res = await addWidget(formData);
      if ("data" in res) {
        toast.success((res as { data: any }).data.message);
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
    <form
      onSubmit={handleSubmit}
      className={`bg-white mt-1 md:p-7 p-5 lg:h-[calc(100vh-90px)] h-full relative  ${
        loading ? "overflow-hidden" : "lg:overflow-y-auto"
      }`}
    >
      {loading && <Loader />}
      <h3 className="text-black-opacity-60 text-lg">Widget</h3>
      {/* input section flex */}
      <div className="flex  justify-center flex-col gap-5 mt-12">
        <CustomGlobalInput
          label="Title"
          type="text"
          placeholder="32% Discount"
          name="title"
          value={data?.data?.title || ""}
          onChange={handleChange}
        />
        <CustomGlobalInput
          label="Tag"
          type="text"
          placeholder="Brother Ink"
          name="tag"
          value={data?.data?.tag || ""}
          onChange={handleChange}
        />
        <CustomGlobalInput
          label="Description"
          type="text"
          placeholder="For all electronics products"
          name="description"
          value={data?.data?.description || ""}
          onChange={handleChange}
        />
        <div className="flex w-full gap-5   overflow-hidden ">
          <div className="md:w-3/12 w-4/12">
            <CustomGlobalInput
              label="Button Text"
              type="text"
              placeholder="Shop Now"
              name="buttonText"
              value={data?.data?.buttonText || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full ">
            <CustomGlobalInput
              label="Link"
              type="text"
              placeholder="https://"
              name="link"
              value={data?.data?.link || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-start">
          <FileUploader
            name="productPhoto"
            className="border border-dashed   min-h-48 h-full min-w-48 w-auto relative cursor-pointer flex items-center justify-center text-black-opacity-60 text-xs "
            data={data.data}
            multiple={true}
            onChange={handleChange}
            accept="image/jpg,image/jpeg,image/png"
            maxSize={2}
            bottomText="Upload Size 340px to 500px"
          ></FileUploader>
        </div>
      </div>
      <div className="w-full flex  items-center lg:justify-end justify-center gap-5 my-10 ">
        <ButtonPrimary
          type="submit"
          buttonText={loading ? "Submiting" : "Submit"}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default WidgetInput;
