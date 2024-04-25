import React from 'react';

const ProductsTableSkeleton = () => {
    return (
        <>
            <td className='md:table-cell hidden'>
                <div
                    className="w-10 h-3  bg-gray-200 rounded-full text-inherit">
                    &nbsp;
                </div>
            </td>
            <td>
                <div className="flex items-center  gap-2 my-2 px-2">
                    <div
                        className="md:w-10 md:h-10 w-8 h-8  bg-gray-200 rounded-full text-inherit">
                        &nbsp;
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex flex-col">
                    <div className="flex flex-col  gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex flex-col">
                    <div className="flex flex-col  gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex flex-col">
                    <div className="flex flex-col  gap-2.5">
                        <div
                            className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                        <div
                            className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center '>
                    <div
                        className="mx-auto  w-10 h-8  bg-gray-200 rounded-md text-inherit">
                        &nbsp;
                    </div>
                    <div
                        className="mx-auto  w-10 h-8  bg-gray-200 rounded-md text-inherit">
                        &nbsp;
                    </div>
                </div>
            </td>
        </>
    );
};

export default ProductsTableSkeleton;