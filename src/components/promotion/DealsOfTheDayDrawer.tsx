import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import ButtonSecondary from "../ui/btn/ButtonSecondary";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import FileInput from "../ui/FileInput";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { useAppDispatch } from "@/store/hook";
import {
  resetDeals,
  setDeals,
} from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import { useAddDealsOfTheDayAndWidgetMutation } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../shared/loaders/Loader";
const DealsOfTheDayDrawer = ({ data }: any) => {
  const [loading, setLoading] = useState(false);
  const [addDeals] = useAddDealsOfTheDayAndWidgetMutation();
  const dispatch = useAppDispatch();
  const formData = new FormData();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.append(data.fieldName, JSON.stringify(data));

    setLoading(true);

    try {
      const res = await addDeals(formData);
      console.log(res);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setDeals(false));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomGlobalDrawer
        childrenClassName="overflow-y-scroll"
        modalWidthControlClassName="w-full md:w-[500px]"
        isVisible={Object.keys(data).length ? true : false}
      >
        {/* main container */}
        <div className={`p-5 overflow-y-auto  ${loading && "overflow-hidden"}`}>
          {loading && <Loader />}
          {/* top section */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg">Deals Of The Day</h3>
            <DrawerModalCloseBTN handleClose={() => dispatch(resetDeals())} />
          </div>

          {/* main section */}

          <div className="w-full">
            <FileInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target?.files?.length) {
                  formData.append(
                    data.fieldName + ".productPhoto",
                    e.target?.files[0]
                  );
                  // create image url using file value
                  const reader = URL.createObjectURL(e.target?.files[0]);
                }
              }}
              imageBottomText=""
              name="productPhoto"
            />
          </div>

          {/* input section */}
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-4 items-center justify-center w-full md:flex-row  flex-col">
              <div className="flex flex-col gap-4 w-full">
                <CustomGlobalInput
                  label="Title"
                  type="text"
                  name="title"
                  value={data?.title}
                  placeholder="Type here"
                  onChange={(e) =>
                    dispatch(setDeals({ [e.target.name]: e.target.value }))
                  }
                />
                <CustomGlobalInput
                  label="Description"
                  type="text"
                  name="description"
                  value={data?.description}
                  placeholder="Type here"
                  onChange={(e) =>
                    dispatch(setDeals({ [e.target.name]: e.target.value }))
                  }
                />
                <CustomGlobalInput
                  label="Link"
                  type="text"
                  name="link"
                  value={data?.link}
                  placeholder="Add Link"
                  onChange={(e) =>
                    dispatch(setDeals({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid w-full gap-5   grid-cols-2 ">
              <div className="">
                <CustomGlobalInput
                  label="Button Text"
                  type="text"
                  name="buttonText"
                  value={data?.buttonText}
                  placeholder="Shop Now"
                  onChange={(e) =>
                    dispatch(setDeals({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
              <div className=" ">
                <CustomGlobalInput
                  label="Discount"
                  type="number"
                  name="discount"
                  value={data?.discount}
                  placeholder="0% off"
                  onChange={(e) =>
                    dispatch(setDeals({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="w-full flex  items-center lg:justify-end justify-center gap-5 my-10 ">
              <ButtonSecondary buttonText="Reset" type="reset" />
              <ButtonPrimary
                type="submit"
                buttonText={loading ? "Submiting" : "Submit"}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </CustomGlobalDrawer>
    </form>
  );
};

export default DealsOfTheDayDrawer;
