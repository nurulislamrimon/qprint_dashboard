const OrderAndShippingInfo = () => {
    return (
        <div className='flex flex-col gap-7'>
            <span className=' text-lg font-medium'>Order & Shipping Info</span>
            <div className='flex flex-col gap-5'>
                <label className='flex flex-col gap-2.5 text-black-opacity-70'>
                    Order Status
                    <select className='border outline-none px-5 py-2.5 rounded-custom-5px text-black-opacity-60 bg-transparent'>
                        <option value="" >select</option>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                        <option value=" Cancel">Cancel</option>
                        <option value="Returned">Returned</option>
                    </select>
                </label>
                <label className='flex flex-col gap-2.5 text-black-opacity-70'>
                    Payment Status
                    <select className='border outline-none px-5 py-2.5 rounded-custom-5px text-black-opacity-60 bg-transparent'>
                        <option value="">select</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default OrderAndShippingInfo;