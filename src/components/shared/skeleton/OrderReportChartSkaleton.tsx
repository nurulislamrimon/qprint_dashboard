const OrderReportChartSkaleton = () => {
  return (
    <>
      <div role="status" className="w-full animate-pulse  dark:border-gray-700">
        <div className="flex items-baseline gap-3 md:gap-7 lg:gap-14 xl:gap-20 mt-4 md:border-b md:border-l pb-1">
          <div className="flex items-baseline gap-3 h-full w-full md:pl-3">
            <div className="w-[50%] md:w-full bg-gray-200 rounded-t-full rounded-b-xl h-60 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[50%]   bg-gray-200 rounded-t-full  h-60 md:-full dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-48 md:h-80  dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
          </div>
          <div className="flex items-baseline gap-3 h-full w-full">
            <div className=" w-[50%] bg-gray-200 rounded-t-full  h-52 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[50%]   bg-gray-200 rounded-t-full h-20 md:-full dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
          </div>
          <div className="flex items-baseline gap-3 h-full w-full">
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[50%]   bg-gray-200 rounded-t-full h-60 md:-full dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-32 md:h-80  dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-20 md:h-80  dark:bg-gray-300"></div>
          </div>
          <div className="flex items-baseline gap-3 h-full w-full">
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[50%]   bg-gray-200 rounded-t-full  h-60 md:-full dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-44 md:h-80  dark:bg-gray-300"></div>
          </div>
          <div className="flex items-baseline gap-3 h-full w-full">
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-14 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[50%]   bg-gray-200 rounded-t-full h-60 md:-full dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
            <div className="w-[50%] bg-gray-200 rounded-t-full  h-40 md:h-80  dark:bg-gray-300"></div>
          </div>
          {/* <div className="flex items-baseline gap-3 h-full w-full">
            <div className=" w-full bg-gray-200 rounded-t-full  h-60 md:h-72  dark:bg-gray-300"></div>
            <div className="w-[full-64  bg-gray-200 rounded-t h-60 md:-full dark:bg-gray-300"></div>
            <div className="w-full bg-gray-200 rounded-t-full  h-60 md:  dark:bg-gray-300"></div>
            <div className="w-full bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
            <div className="w-full bg-gray-200 rounded-t-full  h-60 md:h-80  dark:bg-gray-300"></div>
          </div> */}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default OrderReportChartSkaleton;
