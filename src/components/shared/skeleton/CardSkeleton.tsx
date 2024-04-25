import React from 'react';

const CardSkeleton = () => {
    return (
        <div role="status" className="w-[calc(200px, 2vw, 165px)] animate-pulse">
            <div className="flex items-center justify-center h-40 mb-4 bg-gray-200 rounded ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                    className="w-12 h-12 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
                    </path>
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full "></div>
            <div className="flex items-center mt-4">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default CardSkeleton;