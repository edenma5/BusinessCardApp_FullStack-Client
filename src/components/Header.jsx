import React, { useCallback, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import images from '../Images/index';
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()
    const [, updateState] = useState();
    const forceUpdateHeader = useCallback(() => updateState({}), [])

    function logOutHandle() {
        localStorage.removeItem('userInfo');
        forceUpdateHeader();
        navigate('/');
    }

    return (
        <>
            <nav className='navbarContainer'>
                <motion.div
                    whileHover={{ scale: [1, 1.1] }}
                    transition={{ duration: .6, ease: 'backInOut' }}
                    className='logoContainer'>
                    <img className='logo' src={images.logo} onClick={() => { navigate('/') }} alt='logo' />
                </motion.div>
                <div className='navbarLinks'>
                    <div className='navItems'>
                        <NavLink className={isActive => 'navLink ' + (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                        <NavLink className='navLink' to="/about">About</NavLink>
                        {!userInfo &&
                            <>
                                <NavLink className="navLink" to="/signin">Sign in</NavLink>
                                <NavLink className="navLink" to="/signup">Sign up</NavLink>
                            </>}
                        {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/business">Business</NavLink>}
                        {userInfo && <NavLink className="navLink" to="/allbusinesscards">All Cards</NavLink>}
                        {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/managmentcards">My Cards</NavLink>}
                    </div>
                </div>

                <div className='userLoggedContainer'>
                    <AccountCircleIcon className='userIcon' fontSize='large' />
                    <span className='userNameLogged'>{userInfo?.fullName}</span>
                    <div>
                        {userInfo?.fullName ? <>
                            <span className='logOutText' onClick={logOutHandle}>Log out<LogoutIcon className='logOutIcon' fontSize='small' /></span>
                        </> : <Button variant="text" className="signinBtnHeader" size="small" type="button" onClick={() => { navigate('/signin') }} >Sign in</Button>}
                    </div>
                </div>

                <div className='navbarSideMenuContainer'>
                    <HiMenuAlt4 className='menuIcon' onClick={() => setToggle(true)} />

                    {toggle && (
                        <motion.div
                            className='sideMenuContainer'
                            whileInView={{ x: [150, 0] }}
                            transition={{ duration: .8, ease: 'easeOut' }}
                        >
                            <HiX className='closeIcon' onClick={() => setToggle(false)} />
                            <section className='navItemsSideMenu'>
                                <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/">Home</NavLink>
                                <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/about">About</NavLink>
                                {!userInfo && <>
                                    <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/signin">Sign in</NavLink>
                                    <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/signup">Sign up</NavLink>
                                </>}
                                {userInfo?.isBusinessAccount && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/business">Business</NavLink>}
                                {userInfo && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/allbusinesscards">All Cards</NavLink>}
                                {userInfo?.isBusinessAccount && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/managmentcards">My Cards</NavLink>}
                            </section>
                        </motion.div>
                    )}
                </div>
            </nav>
        </>
    )
}
