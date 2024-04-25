import React from 'react';

const ReviewTableSkeleton = () => {
    return (
        <div

            className="cursor-pointer border-b hover:bg-table-row-hover review-table-body-custom-styles py-3.5 px-2.5 md:px-6 lg:px-7 animate-pulse"
        >
            {/* ==First Child== */}
            <div className="flex items-center  gap-2 my-2 px-2">
                <div
                    className="hidden md:block md:w-10 md:h-10 w-8 h-8  bg-gray-200 rounded-full text-inherit">
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
            {/* ==Second Child== */}
            <div className="flex items-center  gap-2 my-2 px-2">
                <div
                    className="hidden md:block md:w-10 md:h-10 w-8 h-8  bg-gray-200 rounded-full text-inherit">
                    &nbsp;
                </div>
                <div className="flex flex-col gap-2.5">
                    <div
                        className=" md:w-32 w-20 h-2  bg-gray-200 rounded-full">
                        &nbsp;
                    </div>
                    <div
                        className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
                        &nbsp;
                    </div>
                </div>
            </div>
            {/* ==Third Child== */}
            <div className="flex items-center  gap-2 my-2 px-2">
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
            {/* ==Fourth Child== */}
            <div className="hidden md:flex items-center justify-center">
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
            {/* ==Five Child== */}
            <div className="flex items-center justify-end  gap-2 my-2 px-2">
                <div
                    className="md:w-32 w-8 h-6  bg-gray-200 rounded-full">
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

export default ReviewTableSkeleton;