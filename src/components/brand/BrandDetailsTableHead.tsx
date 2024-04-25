import React from 'react';

const BrandDetailsTableHead = () => {
    return (
        <tr className='border-b'>
            {
                ["SL", "Product", "Status", "Stock", "Price", "Action"].map((head) => (
                    <th scope='col' key={head} className={`text-black-opacity-50 md:text-base text-sm font-normal py-2.5 ${head === "SL" && "md:table-cell hidden px-2"} ${head === "Action" ? "text-center" : "text-left"} border-b`}>{head}</th>
                ))
            }
        </tr>
    );
};

export default BrandDetailsTableHead;