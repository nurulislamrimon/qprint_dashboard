import React from 'react';

const PrintingTableHead = () => {
    return (
        <tr>
            <th className='font-normal py-3 px-3.5  text-left'>Customer <span className='hidden md:inline-block'>Name</span></th>
            <th className='font-normal py-3 px-3.5 md:table-cell hidden'>Paper Size</th>
            <th className='font-normal py-3 px-3.5 md:table-cell hidden'>Paper Type</th>
            <th className='font-normal py-3 px-3.5 md:table-cell hidden'>Printing Mode</th>
            <th className='font-normal py-3 px-3.5'>Total Price</th>
            <th className='font-normal py-3 px-3.5'>Status</th>
            <th className='font-normal py-3 px-3.5'>Attachment</th>
        </tr>
    );
};

export default PrintingTableHead;