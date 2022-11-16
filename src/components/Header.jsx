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
                    animate={{ scale: [.6, 1], opacity: [0, 1] }}
                    transition={{ duration: .8, ease: 'backInOut' }}
                    className='logoContainer'>
                    <img className='logo' src={images.logo} onClick={() => { navigate('/') }} alt='logo' />
                </motion.div>
                <motion.div
                    animate={{ y: [-50, 0], opacity: [0, 1] }}
                    transition={{ duration: .8 }}
                    className='navbarLinks'>
                    <div className='navItems'>
                        <NavLink className={isActive => 'navLink ' + (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                        <NavLink className='navLink' to="/about">About</NavLink>
                        {!userInfo &&
                            <>
                                <NavLink className="navLink" to="/signin">Sign in</NavLink>
                                <NavLink className="navLink" to="/signup">Sign up</NavLink>
                            </>}
                        {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/business">Create New Card</NavLink>}
                        {userInfo && <NavLink className="navLink" to="/allbusinesscards">Cards Gallery</NavLink>}
                        {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/managmentcards">Personal Area</NavLink>}
                    </div>
                </motion.div>

                <motion.div
                    animate={{ scale: [.6, 1], opacity: [0, 1] }}
                    transition={{ duration: .8, ease: 'backInOut' }}
                    className='userLoggedContainer'>
                    <AccountCircleIcon className='userIcon' fontSize='large' />
                    <span className='userNameLogged'>{userInfo?.fullName}</span>
                    <div>
                        {userInfo?.fullName ? <>
                            <span className='logOutText' onClick={logOutHandle}>Log out<LogoutIcon className='logOutIcon' fontSize='small' /></span>
                        </> : <Button variant="text" className="signinBtnHeader" size="small" type="button" onClick={() => { navigate('/signin') }} >Sign in</Button>}
                    </div>
                </motion.div>

                <div className='navbarSideMenuContainer'>
                    <HiMenuAlt4 className='menuIcon' onClick={() => setToggle(true)} />

                    {toggle && (
                        <motion.div
                            className='sideMenuContainer'
                            animate={{ x: [160, 0] }}
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
                                {userInfo?.isBusinessAccount && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/business">Create New Card</NavLink>}
                                {userInfo && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/allbusinesscards">Cards Gallery</NavLink>}
                                {userInfo?.isBusinessAccount && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/managmentcards">Personal Area</NavLink>}
                            </section>
                        </motion.div>
                    )}
                </div>
            </nav>
        </>
    )
}
