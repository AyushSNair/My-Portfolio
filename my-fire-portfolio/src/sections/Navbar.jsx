import React, { useState } from 'react';
import { motion } from "motion/react";

function Navigation(){
    return( 
        <ul className="nav-ul">
            <li className="nav-li">
                <a className='nav-link' href = "#home">Home</a>
            </li>

            <li className="nav-li">
                <a className='nav-link' href = "#about">about</a>
            </li>

            <li className="nav-li">
                <a className='nav-link' href = "#work">work</a>
            </li>

            <li className="nav-li">
                <a className='nav-link' href = "#contact">contact</a>
            </li>
        </ul>

    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed insert-x-0 z-20 w-full backdrop-blur-lg bg-transparent">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Ayush
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'>
            <img src={isOpen ? "assets/menu.png" : "assets/menu.png"} className="w-10 h-6" alt = "toggle" />
            
          </button>
          <nav className='hidden sm:flex'>
            <Navigation />
          </nav>
        </div>
      </div>
      
      {isOpen && (<motion.div className='block-overflow-hidden text-centersm:hidden' 
      initial={{opacity: 0, x:-10}}
      animate={{opacity: 1, x:0}}
      style={{maxHeight: "100vh"}}
      transition={{duration: 1}}
      >
        <nav className='pb-5'>
            <Navigation />
        </nav>

      </motion.div>)}
    </div>
  );
}

export default Navbar;