import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [showPopover, setShowPopover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();



  return (
    <header className="text-black w-full flex justify-center z-50">
      <div className="h-14 w-full bg-nomnom/90 text-light_hover backdrop-blur-lg">
        <nav className="h-full mx-auto flex items-center justify-between px-24 gap-2">
          {/* Navbar logo */}
          <div className="flex lg:flex-1">
            <button className="flex items-center gap-1">
              <span className="text-3xl font-black font-cursive">AuthOrr_</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-md focus:outline-none"
            >
              {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>

          {/* Navbar items */}
          <div
            className={`${menuOpen ? 'absolute top-16 left-0 right-0 bg-neutral-300/95 py-3' : 'hidden'} lg:flex items-center gap-1 lg:gap-2 w-full lg:w-auto justify-center`}>
            <Link to="/" className="nav-item">
              <div
                className="text-lg px-4 py-1 rounded-full transition-all hover:underline hover:underline-offset-8">
                Home
              </div>
            </Link>
            <Link to="/" className="nav-item">
              <div
                className="text-lg px-4 py-1 rounded-full transition-all hover:underline hover:underline-offset-8">
                Restaurants
              </div>
            </Link>
            <Link to="/" className="nav-item">
              <div
                className="text-lg px-4 py-1 rounded-full transition-all hover:underline hover:underline-offset-8">
                Dashboard
              </div>
            </Link>
            <Link to="/cart" className=" px-4 nav-item">
              <ShoppingCart/>
            </Link>
            <Link to="/myorders" className=" px-4 nav-item">
              <User/>
            </Link>
            <button  className=" px-4 nav-item">
              <LogOut/>
            </button>
          </div>


          {/* Login/Register */}
          <div className="hidden lg:flex flex-1 justify-end">
            <div className="flex gap-1 items-center bg-nomnom rounded-full text-light_hover">
              <Link to='/login'
                    className='px-3 py-1 text-lg font-medium rounded-full hover:underline hover:underline-offset-4'>
                Login
              </Link>
              <span className="text-yellow-400">|</span>
              <Link to='/signup'
                    className='px-3 py-1 text-lg font-medium rounded-full hover:underline hover:underline-offset-4'>
                Register
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
