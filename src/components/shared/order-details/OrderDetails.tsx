import Calender from '@/assets/assetsSVG/Calender';
import PrinterWhite from '@/assets/assetsSVG/PrinterWhite';
import Image from 'next/image';
import visaLogo from '@/assets/visa_logo.png';
import OrderDetailsTable from './OrderDetailsTable';
import OrderCalculation from './OrderCalculation';
import OrderAndShippingInfo from './Order&ShippingInfo';
import CustomerInformation from './CustomerInformation';
import DeliveryAddress from './DeliveryAddress';
import OrderInformations from './OrderInformations';

const OrderDetails = () => {
    return (
        <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-1 h-[calc(100vh-85px)] overflow-y-auto">
            {/* order details */}
            <div className="bg-white md:px-5 md:py-5 px-5 py-custom-15px col-span-2">
                {/* render order details here */}
                <OrderInformations />
                <div className='flex flex-col gap-5 mt-5'>
                    <span>Order Item</span>
                    <OrderDetailsTable />
                    <div className='flex items-center md:justify-end'>
                        <OrderCalculation />
                    </div>
                </div>
            </div>
            {/* customer informations */}
            <div className="flex flex-col gap-1 ">
                <div className='bg-white md:px-5 md:py-5 px-5 py-custom-15px '>
                    <OrderAndShippingInfo />
                </div>
                <div className='bg-white md:px-5 md:py-5 px-5 py-custom-15px '>
                    <CustomerInformation />
                </div>
                <div className='bg-white md:px-5 md:py-5 px-5 py-custom-15px h-[calc(100vh-580px)]'>
                    <DeliveryAddress />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;