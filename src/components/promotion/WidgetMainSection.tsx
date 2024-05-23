"use client";
import React, { useEffect } from "react";
import { useGetDealsOfTheDayAndWidgetQuery } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import WidgetInput from "./card/WidgetInput";
import WidgetPreview from "./WidgetPreview";
import {
  setDeals,
  setWidgetFiles,
} from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";

const WidgetMainSection = () => {
  const { data, isLoading: initialLoading } =
    useGetDealsOfTheDayAndWidgetQuery("");

  const dispatch = useAppDispatch();
  const widgetData = useAppSelector((state) => state.widget);

  useEffect(() => {
    if (data?.data?.widget) {
      dispatch(setDeals(data.data.widget));
    }
  }, [data, dispatch]);

  return (
    <div className="grid lg:grid-cols-[auto_300px] gap-1 grid-cols-1 overflow-y-auto h-[calc(100vh-90px)]">
      {/* Right section for widget input */}
      <WidgetInput data={widgetData} initialLoading={initialLoading} />

      {/* Left section for widget preview */}
      <div className="bg-white lg:mt-1 mt-0 md:py-7 p-5 h-full lg:h-[calc(100vh-90px)] ">
        <h3 className="text-black-opacity-60 text-lg mb-5">Preview</h3>
        <div className="flex items-center justify-center">
          <WidgetPreview data={widgetData} />
        </div>
      </div>
    </div>
  );
};

export default WidgetMainSection;
