import React from 'react';

const CustomSpinner = () => {
    return (
        <div className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status">
        </div>
    );
};

export default CustomSpinner;