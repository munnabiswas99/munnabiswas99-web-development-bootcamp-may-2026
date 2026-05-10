import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";

const Logo = () => {
    return (
        <div className='w-auto flex gap-2 items-center border border-dashed py-1 px-2 rounded-2xl shadow-2xl'>
            <FaFileInvoiceDollar />
            <p className='font-semibold text-primary-text'>Expense Tracker</p>
        </div>
    );
};

export default Logo;