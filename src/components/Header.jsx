import React, { useCallback, useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import images from '../Images/index';
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

export default function Header() {
    const [toggle, setToggle] = useState(false)
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
                <div className='logoContainer'>
                    <img className='logo' src={images.logo} onClick={() => { navigate('/') }} alt='logo' />
                </div>
                <div className='navbarLinks'>
                    <div className='navItems'>
                        <NavLink className="navLink" aria-current="page" to="/">Home</NavLink>
                        <NavLink className="navLink" to="/about">About</NavLink>
                        <NavLink className="navLink" to="/signin">Signin</NavLink>
                        <NavLink className="navLink" to="/signup">Signup</NavLink>
                        {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/business">Business</NavLink>}
                        <div className='secondaryLinks'>
                            {userInfo && <NavLink className="navLink" to="/allbusinesscards">All Cards</NavLink>}
                            {userInfo?.isBusinessAccount && <NavLink className="navLink" to="/managmentcards">My Cards</NavLink>}
                        </div>
                    </div>
                </div>

                <div className='userLoggedContainer'>
                    <AccountCircleIcon className='userIcon' fontSize='large' />
                    <span className='userNameLogged'>{userInfo?.fullName}</span>
                    <div>
                        {userInfo?.fullName ? <>
                            <span className='logOutText' onClick={logOutHandle}>LogOut<LogoutIcon className='logOutIcon' fontSize='small' /></span>
                        </> : <Button variant="text" className="signinBtnHeader" size="small" type="button" onClick={() => { navigate('/signin') }} >Signin</Button>}
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
                                <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/signin">Signin</NavLink>
                                <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/signup">Signup</NavLink>
                                <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/business">Business</NavLink>
                                {userInfo && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/allbusinesscards">All Cards</NavLink>}
                                {userInfo?.isBusinessAccount && <NavLink className="navLinkSideMenu" onClick={() => setToggle(false)} to="/managmentcards">My Cards</NavLink>}
                            </section>
                        </motion.div>
                    )}
                </div>
            </nav>







            {/* <nav id='navbar' className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src={images.logo} alt="logo" className="d-inline-block align-text-top imgLogo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav" >
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/about">About</NavLink>
                            <NavLink className="nav-link" to="/signin">Signin</NavLink>
                            <NavLink className="nav-link" to="/signup">Signup</NavLink>
                            <NavLink className="nav-link" to="/business">Business</NavLink>
                            {userInfo && <NavLink className="nav-link" to="/allbusinesscards">All Business Cards</NavLink>}
                            {userInfo?.isBusinessAccount && <NavLink className="nav-link" to="/managmentcards">Management Cards</NavLink>}
                        </div>
                    </div>
                </div>

                <div className='userLoggedContainer'>
                    <AccountCircleIcon className='userIcon' fontSize='large' />
                    <span className='userNameLogged'>{userInfo?.fullName}</span>
                    <div>
                        {userInfo?.fullName ? <>
                            <span className='logOutText' onClick={logOutHandle}>LogOut<LogoutIcon className='logOutIcon' fontSize='small' /></span>
                        </> : <Button variant="text" className="signinBtnHeader" size="small" type="button" onClick={() => { navigate('/signin') }} >Signin</Button>}
                    </div>
                </div>
            </nav>
            <Outlet /> */}
        </>
    )
}
