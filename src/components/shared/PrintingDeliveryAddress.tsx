import Address from '@/assets/assetsSVG/Address';
import { IconMapPin, IconPhone, IconUser } from '@tabler/icons-react';
import React from 'react';

const PrintingDeliveryAddress = ({ data }: any) => {
    return (
        <div className='p-5 flex flex-col gap-5'>
            <div className='flex items-center gap-2.5'>
                <span>
                    <Address />
                </span>
                <span className='text-base main-text-color'>Delivery Addresses</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5'>
                <div className='flex items-center gap-2.5'>
                    <IconUser stroke={1} height={20} width={20} />
                    <span className='text-black-opacity-60 text-base'>{data?.data?.buyer?.shippingAddress?.firstName} {" "} {
                        data?.data?.buyer?.shippingAddress?.lastName}</span>
                </div>
                <div className='flex items-center gap-2.5'>
                    <IconPhone stroke={1} height={20} width={20} />
                    <span className='text-black-opacity-60 text-base'>
                        {data?.data?.buyer?.shippingAddress?.phoneNumber}
                    </span>
                </div>
                <div className='flex items-start gap-2.5 md:col-span-2'>
                    <IconMapPin stroke={1} height={20} width={20} />
                    <span className='text-black-opacity-60 text-base line-clamp-1'>
                        {data?.data?.buyer?.shippingAddress?.streetAddress}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PrintingDeliveryAddress;