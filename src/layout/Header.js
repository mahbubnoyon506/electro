import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaRegHeart } from 'react-icons/fa'
import { MdLocationOn, MdOutlineDashboard } from 'react-icons/md'
import { IoLogoUsd } from 'react-icons/io'
import { BsPersonCircle } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { Button, Menu, MenuItem } from '@mui/material';
import OpenCart from '../components/Products/OpenCart'
import OpenWishlist from '../components/Products/Wishlist'
import { Link, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../firebase.init';


const Header = () => {
    const [user] = useAuthState(auth)
    // console.log(user)
    const [openCart, setOpenCart] = useState(false);
    // const [openWishList, setOpenWishList] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickAccount = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setOpenCart(event.currentTarget);
    };

    // const handleClickWish = (event) => {
    //     setOpenWishList(event.currentTarget);
    // };
    const logout = () => {
        signOut(auth);
    };

    return (
        <div className=''>
            <div className='text-base-100 bg-[#1E1F29] py-2 px-5 md:px-10 flex justify-between'>
                <div className=' '>
                    <ul className='md:flex'>
                        <li className='font-semibold hover:text-primary mr-2'><a className='flex items-center' href=""><FaPhoneAlt className='mr-1' color='#ff1e00' /> +021-95-51-84</a></li>
                        <li className='font-semibold hover:text-primary mr-2'><a className='flex items-center' href=""><FaEnvelope className='mr-1' color='#ff1e00' /> email@email.com</a></li>
                        <li className='font-semibold hover:text-primary mr-2'><a className='flex items-center' href=""><MdLocationOn className='mr-1' color='#ff1e00' /> 1734 Stonecoal Road</a></li>
                    </ul>
                </div>
                <div className='md:flex'>
                    <p className='font-semibold hover:text-primary mr-2 flex items-center'><IoLogoUsd color='#ff1e00' />USD</p>
                    {
                        !user ? <Link className='font-semibold hover:text-primary mr-2 flex items-center' to='/signin'> <FiLogIn className='mr-1' color='#ff1e00' />Sign In</Link> :
                            <div>
                                <button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClickAccount}
                                    className='text-base-100 font-semibold hover:text-primary mr-2 flex items-center'
                                >
                                    <BsPersonCircle className='mr-1' color='#ff1e00' />
                                    My Account
                                </button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Link to='/dashboard'><MenuItem onClick={handleClose}> <MdOutlineDashboard className='mr-2' size={20} /> Dashboard</MenuItem></Link>
                                    <Link to=''><MenuItem onClick={handleClose}> <BsPersonCircle className='mr-2' size={20} /> Profile</MenuItem></Link>
                                    <MenuItem onClick={() => { handleClose(); logout(); }}> <FiLogOut className='mr-2' size={20} /> Logout</MenuItem>
                                </Menu>
                            </div>
                    }
                </div>
            </div>
            <div className='bg-[#15161D] py-3 px-10 lg:flex flex-row justify-between items-center border-b-2 border-primary'>
                <div className='basis-1/4 flex justify-center lg:justify-start pb-5 lg:pb-0'>
                    <Link to='/' className='text-6xl font-bold text-base-100'>Electro</Link>
                </div>
                <div className='basis-2/4 lg:flex justify-between bg-base-100 rounded-full py-1 px-3 hidden'>
                    <div className=''>
                        <select className='' name="" id="">
                            <option value="All Category" selected>All Category</option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                            <option value="Category 3">Category 3</option>
                        </select>
                    </div>
                    <input type="search" name="" id="" />
                    <Button sx={{ borderRadius: '45px', background: '#ff1e00', padding: '5px 20px', '&:hover': { backgroundColor: '#011B39' } }} variant="contained" >Search</Button>
                </div>
                <div className='basis-1/4 flex justify-evenly text-base-100'>
                    <div>
                        <Link to='/wishlist' className='cursor-pointer'

                        >
                            <FaRegHeart className='mx-auto' size={30} color='#ff1e00' />
                            <p>Your Wishlist</p>
                        </Link>
                        {/* {
                            openWishList &&
                            <OpenWishlist
                                className=""
                                openWishList={openWishList}
                                setOpenWishList={setOpenWishList}
                            ></OpenWishlist>
                        } */}
                    </div>
                    <div>
                        <button className='cursor-pointer'
                            onClick={handleClick}
                        >
                            <AiOutlineShoppingCart className='mx-auto' size={30} color='#ff1e00' />
                            <p>Your Cart</p>
                        </button>
                        {openCart &&
                            <OpenCart
                                className=""
                                openCart={openCart}
                                setOpenCart={setOpenCart}
                            ></OpenCart>
                        }
                    </div>
                </div>
            </div>
            <div className='bg-base-100 py-4 border-b-2 border-secondary'>
                <ul className='md:flex justify-center'>
                    <NavLink to='/' className='mx-5 text-lg font-semibold'>Home</NavLink>
                    <NavLink to='#' className='mx-5 text-lg font-semibold'>Hot Deals</NavLink>
                    <NavLink to='#' className='mx-5 text-lg font-semibold'>Laptop</NavLink>
                    <NavLink to='#' className='mx-5 text-lg font-semibold'>Cameras</NavLink>
                    <NavLink to='#' className='mx-5 text-lg font-semibold'>Smartphones</NavLink>
                    <NavLink to='#' className='mx-5 text-lg font-semibold'>Accessories</NavLink>
                </ul>
            </div>
        </div >
    );
};

export default Header;


