import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import FileInput from "@/components/ui/FileInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import ButtonSecondary from "@/components/ui/btn/ButtonSecondary";
import { useAddDealsOfTheDayAndWidgetMutation } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import { setDeals } from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import { useAppDispatch } from "@/store/hook";
import { useState } from "react";
import { toast } from "react-toastify";

const WidgetInput = (data: any) => {
  const dispatch = useAppDispatch();
  const [addWidget] = useAddDealsOfTheDayAndWidgetMutation();
  const formData = new FormData();
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append("widget", JSON.stringify(data?.data));

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
      className="bg-white mt-1 md:p-7 p-5 lg:h-[calc(100vh-90px)] h-full lg:overflow-y-auto   "
    >
      <h3 className="text-black-opacity-60 text-lg">Widget</h3>
      {/* input section flex */}
      <div className="flex  justify-center flex-col gap-5 mt-12">
        <CustomGlobalInput
          label="Title"
          type="text"
          placeholder="32% Discount"
          name="title"
          value={data?.data?.title || ""}
          onChange={(e) =>
            dispatch(setDeals({ [e.target.name]: e.target.value }))
          }
        />
        <CustomGlobalInput
          label="Tag"
          type="text"
          placeholder="Brother Ink"
          name="tag"
          value={data?.data?.tag || ""}
          onChange={(e) =>
            dispatch(setDeals({ [e.target.name]: e.target.value }))
          }
        />
        <CustomGlobalInput
          label="Description"
          type="text"
          placeholder="For all electronics products"
          name="description"
          value={data?.data?.description || ""}
          onChange={(e) =>
            dispatch(setDeals({ [e.target.name]: e.target.value }))
          }
        />
        <div className="flex w-full gap-5   overflow-hidden ">
          <div className="md:w-3/12 w-4/12">
            <CustomGlobalInput
              label="Button Text"
              type="text"
              placeholder="Shop Now"
              name="buttonText"
              value={data?.data?.buttonText || ""}
              onChange={(e) =>
                dispatch(setDeals({ [e.target.name]: e.target.value }))
              }
            />
          </div>
          <div className="w-full ">
            <CustomGlobalInput
              label="Link"
              type="text"
              placeholder="https://"
              name="link"
              value={data?.data?.link || ""}
              onChange={(e) =>
                dispatch(setDeals({ [e.target.name]: e.target.value }))
              }
            />
          </div>
          <FileInput
            name="productPhoto"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target?.files?.length) {
                formData.append(`widget.productPhoto`, e.target?.files[0]);
                // create image url using file value
                const reader = URL.createObjectURL(e.target?.files[0]);
              }
            }}
            imageBottomText=""
          />
        </div>
      </div>
      <div className="w-full flex  items-center lg:justify-end justify-center gap-5 my-10 ">
        <ButtonSecondary buttonText="Reset" type="submit" />
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
