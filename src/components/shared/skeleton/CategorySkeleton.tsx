import React from 'react';

const CategorySkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center  gap-3.5">
                <div className="bg-gray-200 w-8 h-8 rounded-full">
                </div>
                <div className="bg-gray-200 w-2/3 h-6 rounded-full">
                </div>
            </div>
        </div>
    );
};

export default CategorySkeleton;