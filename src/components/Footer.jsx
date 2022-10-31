import React from 'react'
import { Outlet, Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className='footerWrap'></div>

            <div className='footerContainer'>
                <footer>
                    <ul>
                        <li><Link className='footerLink' to="/">Home</Link></li>
                        <li><Link className='footerLink' to="/about">About</Link></li>
                        <li><Link className='footerLink' to="/signin">Signin</Link></li>
                        <li><Link className='footerLink' to="/signup">Signup</Link></li>
                    </ul>
                    <h5 className='copyright'>Copyright© {currentYear} Business Card App By Eden Maimon</h5>
                </footer>
            </div>
            <Outlet />
        </>
    )
}
