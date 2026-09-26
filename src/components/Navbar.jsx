import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, ShoppingCart, LogIn, LogOut, ShoppingBag } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className='sticky top-0 left-0 z-50'>
            <nav className='flex justify-between items-center border-b-[0.5px] relative border-stone-200 bg-white/80 backdrop-blur-xl px-4 lg:px-8'>
                
                <Link to="/">
                    <img className='h-20' src="/apna-mart-logo.png" alt="Apna Mart Logo" />
                </Link>

                <div className='flex gap-8 p-2 font-medium absolute left-1/2 -translate-x-1/2'>
                    <Link to="/"><Home className='size-8 hover:text-green-400 text-stone-600 transition-all' /></Link>
                    <Link to="/cart"><ShoppingCart className='size-8 hover:text-green-400 text-stone-600 transition-all' /></Link>
                    <Link to="/orders"><ShoppingBag className='size-8 hover:text-green-400 text-stone-600 transition-all' /></Link>
                </div>

                <div className='flex items-center gap-4'>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-stone-600 hidden sm:block">
                                Hi, {user.name.split(' ')[0]}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-stone-100 hover:bg-red-50 text-red-500 px-4 py-2 rounded-lg font-medium transition-all"
                            >
                                <LogOut className="size-5" />
                                <span className="hidden sm:block">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/login"
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                        >
                            <LogIn className="size-5" />
                            <span className="hidden sm:block">Login</span>
                        </Link>
                    )}
                </div>

            </nav>
        </div>
    )
}

export default Navbar