import React from 'react';

const SocialMediaLayoutSkeleton = () => {
    return (
        <div className="animate-pulse border w-full p-5 rounded-lg flex flex-col gap-8" >
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-200 w-28  h-2 rounded-full"></div>
                    <div className="bg-gray-200 w-20  h-2 rounded-full"></div>
                </div>
                <div className="bg-gray-200 w-16 rounded-full h-6"></div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-200 w-2/3  h-2 rounded-full"></div>
                    <div className="bg-gray-200 w-1/3  h-2 rounded-full"></div>
                </div>
                <div className="bg-gray-200 w-full h-10 rounded"></div>
            </div>
        </div>
    );
};

export default SocialMediaLayoutSkeleton;