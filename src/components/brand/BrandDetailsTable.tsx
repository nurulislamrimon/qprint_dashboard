import { BrandsProductData } from '@/constants/brands.constants';
import React from 'react';
import BrandDetailsTableRow from './BrandDetailsTableRow';
import BrandDetailsTableHead from './BrandDetailsTableHead';

const BrandDetailsTable = () => {
    return (
        <table className='w-full border-separate border-spacing-y-5'>
            <thead className='sticky -top-1 bg-white z-20'>
                <BrandDetailsTableHead />

            </thead>
            <tbody >
                {
                    BrandsProductData?.map((data) => (
                        <tr key={data?._id} className='cursor-pointer hover:bg-table-row-hover'>
                            <BrandDetailsTableRow data={data} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default BrandDetailsTable;