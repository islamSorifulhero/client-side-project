import React from 'react';

import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center p-2 rounded-lg transition duration-300 hover:bg-gray-500'>
                <img className='w-30 h-20' src={logo} alt="" />
            </div>
        </Link>
    );
};

export default Logo;