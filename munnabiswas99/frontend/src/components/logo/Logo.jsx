import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <NavLink className='w-auto flex gap-2 items-center border border-dashed py-1 px-2 rounded-2xl shadow-2xl'>
            <FaFileInvoiceDollar />
            <p className='font-semibold text-primary-text'>Expense Tracker</p>
        </NavLink>
    );
};

export default Logo;