"use client";
import { useGetSaleByCateagoryQuery } from "@/store/features/dashboard/saleByCategory/saleByCategoryApi";
import { useEffect, useMemo, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, Legend, Scatter, Line } from "recharts";
import DashboardSalebyCategorySkeleton from "../shared/skeleton/DashboardSalebyCategorySkeleton";

const SaleByCategory = () => {
  const [timePeriod, setTimePeriod] = useState("week"); // Set default time period to "week"
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data: mainData, isLoading } = useGetSaleByCateagoryQuery(
    `createdAt[gte]=${startDate.toISOString()}&createdAt[lt]=${endDate.toISOString()}`
  );

  const currentDate = useMemo(() => new Date(), []);
  let newStartDate = new Date();

  useEffect(() => {
    // Function to fetch data for the last 7 days when the component mounts
    const fetchDataForLast7Days = async () => {
      const newStartDate = new Date(currentDate);
      newStartDate.setDate(currentDate.getDate() - 7);
      setStartDate(newStartDate);
      setEndDate(currentDate);
    };

    fetchDataForLast7Days(); // Fetch data for the last 7 days when the component mounts
  }, [currentDate]);
  const handleTimePeriodChange = (event: any) => {
    const selectedTimePeriod = event.target.value;
    setTimePeriod(selectedTimePeriod);

    switch (selectedTimePeriod) {
      case "week":
        newStartDate.setDate(currentDate.getDate() - 7);
        break;
      case "2 week":
        newStartDate.setDate(currentDate.getDate() - 14);
        break;
      case "1 month":
        newStartDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "6 month":
        newStartDate.setMonth(currentDate.getMonth() - 6);
        break;
      case "1 years":
        newStartDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        newStartDate.setDate(currentDate.getDate() - 7);
        break;
    }

    setStartDate(newStartDate);
    setEndDate(currentDate);
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // <== Sale by category total selling price ==>
  const totalSellingPrice = mainData?.data
    .reduce((total: number, item: any) => total + item.totalSellingPrice, 0)
    .toFixed(2);
  return (
    <div className="w-full md:w-2/5 border rounded-custom-10px p-4 h-[350px] md:h-[450px]">
      <h6 className="text-black-rgba-80 [font-size:clamp(12px,3vw,18px)] font-medium pb-4">
        Sale by category
      </h6>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1.5">
          <span className="flex items-center gap-1.5">
            <strong className="font-bold [font-size:_clamp(10px,3vw,18px)] ">
              Total : {totalSellingPrice ? totalSellingPrice : "0.000000"}
              QR
            </strong>
          </span>
        </div>
        <span className="border hover:border-scale-105 hover:border-red-regular py-2 px-2 rounded-custom5px text-dimGray-70 text-sm hover:text-navy-blue cursor-pointer">
          <select
            className="outline-none pr-[10px] hover:scale-105 hover:duration-200 cursor-pointer"
            id="cars"
            name="timePeriod"
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option value="week">Week</option>
            <option value="2 week">2 week</option>
            <option value="1 month">1 month</option>
            <option value="6 month">6 month</option>
            <option value="1 years">1 Years</option>
          </select>
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[90%]">
          {" "}
          <DashboardSalebyCategorySkeleton />
        </div>
      ) : (
        <div className="flex items-center justify-center relative w-full h-full">
          {/* this recharts  */}
          <div className="relative">
            <PieChart width={250} height={500} className="z-20">
              <Pie
                data={mainData?.data.slice(0, 4)}
                cx={120}
                cy={200}
                width={500}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="totalSellingPrice"
              >
                {mainData?.data
                  ?.slice(0, 4)
                  ?.map((data: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Tooltip />
              <Legend height={200} />
              <Scatter name="red" dataKey="name" fill="red" />
              <Line type="monotone" dataKey="name" stroke="#ff7300" />
            </PieChart>
          </div>

          <div className="flex items-center justify-center flex-col md:gap-1 absolute top-[26%] sm:top-[30%] md:top-[25%] lg:top-[31%] z-0">
            <span className="text-base [font-size:clamp(10px,3vw,15px)] ">
              {mainData?.data[0]?.name}
            </span>
            <span>
              <strong className="font-bold [font-size:_clamp(8px,3vw,15px)]">
                {mainData?.data[0]?.totalSellingPrice} QAR
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleByCategory;
