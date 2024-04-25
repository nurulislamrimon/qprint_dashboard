const OrderCalculation = ({ data }: any) => {
  return (
    <div className="md:w-1/2 w-full">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between text-base text-[#5F6C72]">
          <span>Subtotal</span>
          <strong className="text-right text-black-opacity-70 font-medium">
            {data?.data?.totalPrice} QAR
          </strong>
        </div>
        {data?.data?.totalDiscount >= 1 && (
          <div className="flex items-center justify-between text-base text-[#5F6C72]">
            <span>Discount</span>
            <strong className="text-right text-black-opacity-70 font-medium">
              -{data?.data?.totalDiscount} QAR
            </strong>
          </div>
        )}
        <div className="flex items-center justify-between  text-base text-[#5F6C72]">
          <span>Shipping </span>
          <strong className="text-right text-black-opacity-70 font-medium">
            {data?.data?.shippingCharge ? data?.data?.shippingCharge : 0} QAR
          </strong>
        </div>
        <hr />
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-lg text-black-opacity-80">Total</span>
        <strong className="main-text-color text-lg font-medium">
          {data?.data?.totalPayable} QAR
        </strong>
      </div>
    </div>
  );
};

export default OrderCalculation;
