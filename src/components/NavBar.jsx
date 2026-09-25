import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ShoppingCart } from 'lucide-react'

const NavBar = () => {
    return (
        <div className='sticky top-0 left-0 z-50'>
            <nav className='flex border-b-[0.5px] relative border-stone-200 bg-white/80 backdrop-blur-xl'>
                <img className='h-20' src="/apna-mart-logo.png" alt="Apna Mart Logo" />
                <div className='flex self-end gap-8 p-2 font-medium absolute left-1/2 -translate-x-1/2 '>
                    <Link to="/"><Home className='size-8 hover:text-green-400 text-stone-600 transition-all' /></Link>
                    <Link to="/cart"><ShoppingCart className='size-8 hover:text-green-400 text-stone-600 transition-all' /></Link>
                </div>
            </nav>
        </div>
    )
}

export default NavBar