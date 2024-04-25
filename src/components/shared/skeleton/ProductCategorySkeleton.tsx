import React from 'react';

const ProductCategorySkeleton = () => {
    return (
        <div className="animate-pulse flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col gap-2">
                <div className="w-28 h-2 bg-gray-200 rounded-full"></div>
                <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default ProductCategorySkeleton;