import React from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import CustomGlobalInput from "../shared/CustomGlobalInput";

const ConfirmPaymentModal = ({
  openPaymentModal,
  setOpenPaymentModal,
}: any) => {
  return (
    <div>
      <CustomGlobalModal isVisible={openPaymentModal} setOpenModal={setOpenPaymentModal} mainClassName="w-[485px]">
        <div className="md:p-[30px] flex flex-col gap-[30px]">
          <span className="text-black-opacity-80 text-lg font-medium">
            Please add what amount buyer paid
          </span>
          <CustomGlobalInput
            label="Enter amount"
            placeholder="00.00QR"
            type="number"
          />

          <div
            onClick={() => setOpenPaymentModal(false)}
            className="whitespace-nowrap border w-full max-w-[200px] mx-auto"
          >
            <ButtonPrimary buttonText="Confirm Payment" type="submit" />
          </div>
          <span className="text-black-opacity-50 text-sm italic">
            After pay the order will be move to order placed status
          </span>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default ConfirmPaymentModal;
