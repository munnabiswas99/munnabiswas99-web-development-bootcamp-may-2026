import React from 'react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BsThreeDots } from "react-icons/bs";
import { NavLink } from 'react-router';
import { GiMoneyStack } from 'react-icons/gi';
import { TbMoneybagPlus } from "react-icons/tb";
import { MdMoneyOff } from 'react-icons/md';

const Cards = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {/* Card Income */}
            <div className='border border-gray-300 rounded-xl shadow'>
                <NavLink className='flex justify-end p-2'><BsThreeDots/></NavLink>
                <div className='text-4xl text-green-500 ml-6'><RiMoneyDollarCircleFill /></div>
                <p className='text-sm text-gray-500 my-2 ml-3'>TOTAL INCOME</p>
                <p className='font-bold my-2 ml-3'>$50000</p>
            </div>
            {/* Card Income */}
            <div className='border border-gray-300 rounded-xl shadow'>
                <NavLink className='flex justify-end p-2'><BsThreeDots/></NavLink>
                <div className='text-4xl text-red-500 ml-6'><MdMoneyOff /></div>
                <p className='text-sm text-gray-500 my-2 ml-3'>TOTAL EXPENSE</p>
                <p className='font-bold my-2 ml-3'>$40000</p>
            </div>
            {/* Card Income */}
            <div className='border border-gray-300 rounded-xl shadow'>
                <NavLink className='flex justify-end p-2'><BsThreeDots/></NavLink>
                <div className='text-4xl text-green-500 ml-6'><TbMoneybagPlus /></div>
                <p className='text-sm text-gray-500 my-2 ml-3'>TOTAL SAVINGS</p>
                <p className='font-bold my-2 ml-3'>$10000</p>
            </div>
            {/* Most Spending Card */}
            <div className='border border-gray-300 rounded-xl shadow'>
                <NavLink className='flex justify-end p-2'><BsThreeDots/></NavLink>
                <div className='text-4xl text-red-500 ml-6'><GiMoneyStack /></div>
                <p className='text-sm text-gray-500 my-2 ml-3'>MOST SPENDING</p>
                <p className='font-semibold my-2 ml-3'>$20000</p>
            </div>
        </div>
    );
};

export default Cards;