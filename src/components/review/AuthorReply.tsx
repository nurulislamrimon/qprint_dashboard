import CheckVerify from "@/assets/assetsSVG/CheckVerify";
import { getDateFormat } from "@/utils/getDateFormat";
import { IconTrash } from "@tabler/icons-react";
import { IconEditCircle } from "@tabler/icons-react";
import qLogo from "@/assets/Q.svg";
import Image from "next/image";
import React from "react";

const AuthorReply = ({ data }: any) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <div className="border rounded-full relative p-2.5">
            <div className="bg-white p-[5px] absolute -top-1.5 -right-2 shadow-verify-shadow rounded-full">
              <CheckVerify />
            </div>

            <Image alt="logo" src={qLogo} height={25} width={25} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base text-black font-medium">Q Print</span>
            <div className="bg-black-opacity-60 p-[2px] rounded-full"></div>
            <small className="text-black-opacity-60 text-xs">
              {getDateFormat(data?.data?.updatedAt)}
            </small>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button>
            <IconEditCircle stroke={1} />
          </button>

          <button>
            <IconTrash stroke={1} />
          </button>
        </div>
      </div>
      {/* reply */}
      <p className="mt-4 text-black-opacity-60 text-sm">{data?.data?.reply}</p>
    </div>
  );
};

export default AuthorReply;
