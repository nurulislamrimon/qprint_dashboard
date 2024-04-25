import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format";
import { MutableRefObject } from "react";
import { IconCalendarMonth } from "@tabler/icons-react";

const DateRangePicker = ({ selectedDateRange, onChange }: any) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  const refOne: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const isBrowser = () => typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      if (!isBrowser) return;
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  // const deviceWidth = window.innerWidth;
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  useEffect(() => {
    if (selectedDateRange && selectedDateRange.length > 0) {
      setRange([
        {
          startDate: selectedDateRange[0].startDate,
          endDate: selectedDateRange[0].endDate,
          key: "selection",
        },
      ]);
    }
  }, [selectedDateRange]);

  return (
    <div className="relative">
      <div className="border flex gap-2.5 w-auto md:px-5 px-3 py-2.5 rounded-custom-10px cursor-pointer">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2.5">
            <span>
              <IconCalendarMonth
                stroke={1}
                className="text-black-opacity-70 md:w-5 w-4"
              />
            </span>
            <span
              onClick={() => setOpen((open) => !open)}
              className="md:text-base text-sm text-black-opacity-60 select-none"
            >
              {`${format(range[0].startDate, "MMM dd, yyyy")}`}
            </span>
          </div>
        </div>
        <span className="text-base text-black-opacity-60">-</span>
        <div className="flex items-center gap-2.5">
          <span>
            <IconCalendarMonth
              stroke={1}
              className="text-black-opacity-70 md:w-5 w-4"
            />
          </span>
          <span
            onClick={() => setOpen((open) => !open)}
            className="md:text-base text-sm text-black-opacity-60 select-none"
          >
            {`${format(range[0].endDate, "MMM dd, yyyy")}`}
          </span>
        </div>
      </div>

      <div
        ref={refOne}
        className={`z-50 absolute -right-4 border ${open ? "block" : "hidden"}`}
      >
        <DateRange
          onChange={(item: any) => {
            setRange([item.selection]);
            onChange(item.selection);
          }}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          months={2}
          direction={`${deviceWidth === 800 ? "vertical" : "horizontal"}`}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
