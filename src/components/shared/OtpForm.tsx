"use client";
import {
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  FocusEvent,
  ChangeEvent,
} from "react";

const OtpForm = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // <== Handle KeyDwon ==>
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      !["Backspace", "Delete", "Tab"].includes(e.key) &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" && index > 0 && !inputsRef.current[index].value) {
      e.preventDefault();
      inputsRef.current[index - 1].focus();
    }

    if (
      e.key === "Delete" &&
      index < inputsRef.current.length - 1 &&
      !inputsRef.current[index].value
    ) {
      e.preventDefault();
      inputsRef.current[index + 1].focus();
    }
  };
  // <== Handle Input ==>
  const handleInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.target.value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // <== Handle Focus ==>
  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    e.target.select();
  };
  // <== Handle Paste ==>
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!/^[0-9]{4}$/.test(text)) {
      return;
    }
    text.split("").forEach((digit, index) => {
      inputsRef.current[index].value = digit;
    });
  };

  return (
    <div className="max-w-md mx-auto text-center rounded-xl mt-5">
      <div id="otp-form">
        <div className="flex items-center justify-center gap-3">
          {[...Array(4)].map((_, index) => (
            <input
              title="OTP Input"
              key={index}
              ref={(el) => (inputsRef.current[index] = el as HTMLInputElement)}
              type="text"
              className="w-20 h-20 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent  appearance-none rounded p-4 outline-none active:border-main-border-color focus:border-main-border-color"
              maxLength={1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput(e, index)
              }
              onFocus={handleFocus}
              onPaste={handlePaste}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
