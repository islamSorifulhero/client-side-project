import React from 'react';

import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center'>
                <img className='w-30 h-20' src={logo} alt="" />
                {/* <h3 className="text-xl font-bold">Garments</h3> */}
            </div>
        </Link>
    );
};

export default Logo;