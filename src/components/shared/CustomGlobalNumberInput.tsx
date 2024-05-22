// import { useState, useEffect } from "react";

// interface CustomGlobalNumberInputProps {
//   label?: string;
//   type?: "tel" | "number";
//   placeholder?: string;
//   className?: string;
//   containerStyle?: string;
//   disabled?: boolean;
//   name?: string;
//   value?: string;
//   defaultValue?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const CustomGlobalNumberInput = ({
//   label,
//   type = "tel",
//   placeholder,
//   className,
//   containerStyle,
//   disabled,
//   name,
//   value,
//   onChange,
// }: CustomGlobalNumberInputProps) => {
//   const [number, setNumber] = useState<string>("+974");
//   console.log(typeof number);

//   useEffect(() => {
//     if (value !== undefined && value !== number) {
//       setNumber(value);
//     }
//   }, [value, number]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;

//     // Allow changes only if they match the required pattern and length
//     if (newValue.startsWith("+974") && newValue.length <= 12) {
//       setNumber(newValue);
//       if (onChange) onChange(e);
//     }
//   };

//   return (
//     <div className={`flex flex-col gap-2.5 w-full ${containerStyle}`}>
//       {/* <== Custom Input Label ==> */}
//       {label && (
//         <label
//           htmlFor={label?.toLowerCase()}
//           className=" text-black-opacity-60"
//         >
//           {label}
//         </label>
//       )}
//       <input
//         id={label?.toLowerCase()}
//         type={type}
//         placeholder={placeholder}
//         className={`${className} border py-3 px-3.5 bg-transparent outline-none rounded-custom-5px active:border-main-border-color focus:border-main-border-color`}
//         disabled={disabled}
//         name={name}
//         value={number}
//         onChange={handleChange}
//         pattern="\+974[0-9]{3,8}"
//       />
//     </div>
//   );
// };

// export default CustomGlobalNumberInput;

import { useState, useEffect } from "react";

interface CustomGlobalNumberInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  containerStyle?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomGlobalNumberInput = ({
  label,
  placeholder,
  className,
  containerStyle,
  disabled,
  name,
  value,
  onChange,
}: CustomGlobalNumberInputProps) => {
  const [number, setNumber] = useState<string>("974");

  useEffect(() => {
    if (value !== undefined && value.startsWith("974") && value !== number) {
      setNumber(value.slice(3));
    }
  }, [value, number]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow changes only if they are numeric and within the length constraints
    if (/^\d*$/.test(newValue) && newValue.length <= 8) {
      setNumber(newValue);
      if (onChange) {
        const event = {
          ...e,
          target: {
            ...e.target,
            value: `974${newValue}`,
          },
        };
        onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 w-full ${containerStyle}`}>
      {label && (
        <label
          htmlFor={label?.toLowerCase()}
          className=" text-black-opacity-60"
        >
          {label}
        </label>
      )}
      <div className="flex items-center border py-3 px-3.5 bg-transparent outline-none rounded-custom-5px">
        <span className="mr-2">+974</span> {/* Added margin-right for gap */}
        <input
          id={label?.toLowerCase()}
          type="number"
          placeholder={placeholder}
          className={`${className} w-full`}
          disabled={disabled}
          name={name}
          value={number}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomGlobalNumberInput;
