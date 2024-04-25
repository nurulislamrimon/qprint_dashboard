import TopBar from '@/components/shared/TopBar';
import React from 'react';

const ProductLayout = ({ children }: any) => {
    return (
        <div>
            <div>
                <TopBar title='Product' />
            </div>
            <div className='mt-1'>
                {children}
            </div>

        </div>
    );
};

export default ProductLayout;