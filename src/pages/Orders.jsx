import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, ArrowLeft } from 'lucide-react'

const Orders = () => {
    const navigate = useNavigate();
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            navigate('/login');
            return;
        }
        
        const user = JSON.parse(userString);
        
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const filteredOrders = allOrders.filter(order => order.userEmail === user.email);
        
        setUserOrders(filteredOrders.reverse());
    }, [navigate]);

    if (userOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
                <Package className="size-24 text-stone-300" />
                <h2 className="text-3xl font-bold text-stone-700">No orders yet</h2>
                <p className="text-stone-500">When you buy something, your order history will appear here.</p>
                <Link to="/" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-all">
                    <ArrowLeft className="size-5" /> Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
            <h1 className="text-3xl font-bold mb-8 text-stone-800 flex items-center gap-3">
                <Package className="text-green-500" /> My Orders
            </h1>
            
            <div className="flex flex-col gap-6">
                {userOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
                        
                        <div className="bg-stone-50 p-4 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="text-sm text-stone-500">Order Placed</p>
                                <p className="font-semibold text-stone-800">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-stone-500">Total Amount</p>
                                <p className="font-bold text-green-600">&#36;{order.total.toFixed(2)}</p>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-sm text-stone-500">Order ID</p>
                                <p className="font-mono font-semibold text-stone-800">#{order.id}</p>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-stone-100 rounded p-1 shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`} className="font-medium text-stone-800 hover:text-blue-600 line-clamp-1">
                                            {item.title}
                                        </Link>
                                        <p className="text-stone-500 text-sm">Qty: {item.quantity} &times; &#36;{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders