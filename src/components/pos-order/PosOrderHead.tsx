import React from 'react';

const PosOrderHead = () => {
    return (
        <tr >
            <th className='font-normal py-4 md:table-cell hidden' scope='col'>SL</th>
            <th className='font-normal py-4 md:text-center text-left md:px-0 ps-3' scope='col'>Order Id</th>
            <th className='font-normal py-4 md:table-cell hidden' scope='col'>Order time</th>
            <th className='font-normal py-4' scope='col'>Amount</th>
            <th className='font-normal py-4' scope='col'>Order Type</th>
            <th className='font-normal py-4 md:table-cell hidden' scope='col'>Invoice</th>
        </tr>
    );
};

export default PosOrderHead;