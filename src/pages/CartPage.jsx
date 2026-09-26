import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle } from 'lucide-react'

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // NEW STATES FOR RECEIPT
    const [showReceipt, setShowReceipt] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const updateQuantity = (id, change) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id) => setCart(prevCart => prevCart.filter(item => item.id !== id));

    // UPDATED CHECKOUT FUNCTION
    const handleCheckout = () => {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            alert("Please login to proceed to checkout.");
            navigate('/login');
            return;
        }
        
        const user = JSON.parse(userString);
        
        // 1. Create a detailed Order object
        const newOrder = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toLocaleString(),
            userEmail: user.email, // Tie order to this specific user
            items: cart,
            total: totalPrice
        };

        // 2. Save to "orders" in localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // 3. Trigger the receipt UI and clear cart
        setLastOrder(newOrder);
        setShowReceipt(true);
        setCart([]);
        localStorage.removeItem('cart');
    };

    if (cart.length === 0 && !showReceipt) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <h2 className="text-3xl font-bold text-stone-700">Your cart is empty</h2>
                <Link to="/" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-all">
                    <ArrowLeft className="size-5" /> Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 relative">
            {/* --- RECEIPT MODAL OVERLAY --- */}
            {showReceipt && lastOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                        <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-stone-800 mb-2">Order Confirmed!</h2>
                        <p className="text-stone-500 mb-6">Thank you for your purchase.</p>
                        
                        <div className="bg-stone-50 p-4 rounded-lg text-left mb-6 border border-stone-200">
                            <p className="text-sm text-stone-500">Order ID</p>
                            <p className="font-bold text-stone-800 mb-2">{lastOrder.id}</p>
                            
                            <p className="text-sm text-stone-500">Amount Paid</p>
                            <p className="font-bold text-green-600 mb-2">&#36;{lastOrder.total.toFixed(2)}</p>
                            
                            <p className="text-sm text-stone-500">Date</p>
                            <p className="font-bold text-stone-800">{lastOrder.date}</p>
                        </div>

                        <div className="flex gap-4">
                            <Link to="/" className="flex-1 bg-stone-100 text-stone-800 py-3 rounded-lg font-bold hover:bg-stone-200 transition-all">
                                Home
                            </Link>
                            <Link to="/orders" className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-all">
                                View Orders
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- STANDARD CART UI (Hidden if Receipt is showing) --- */}
            {!showReceipt && (
                <>
                    <h1 className="text-3xl font-bold mb-8 text-stone-800">Shopping Cart</h1>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-1 flex flex-col gap-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 border border-stone-200 rounded-xl shadow-sm">
                                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mix-blend-multiply" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-stone-800 line-clamp-1">{item.title}</h3>
                                        <p className="text-xl font-bold text-green-600">&#36;{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 border rounded-l"><Minus className="size-4" /></button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 border rounded-r"><Plus className="size-4" /></button>
                                        <button onClick={() => removeItem(item.id)} className="p-2 text-red-500"><Trash2 className="size-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Box */}
                        <div className="w-full lg:w-96">
                            <div className="bg-stone-50 p-6 border rounded-xl sticky top-32">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold">Total</span>
                                    <span className="text-2xl font-bold text-green-600">&#36;{totalPrice.toFixed(2)}</span>
                                </div>
                                <button onClick={handleCheckout} className="w-full bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart