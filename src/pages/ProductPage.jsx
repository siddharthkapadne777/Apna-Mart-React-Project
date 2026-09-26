import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProducts } from "../api/index"
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Ratings from '../components/Ratings'

const ProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [sameCategoryProducts, setSameCategoryProducts] = useState([])
    
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProducts(id)
            setProduct(data)
        }
        fetchProduct()
    }, [id])

    useEffect(() => {
        if (!product?.category) return

        const fetchSameCategoryProducts = async () => {
            const allProducts = await getProducts()
            const filtered = allProducts
                .filter((item) => item.category === product.category && item.id !== product.id)
                .slice(0, 4)
            setSameCategoryProducts(filtered)
        }
        fetchSameCategoryProducts()
    }, [product])

    const handleCartAction = (actionType) => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            alert("Please login to add items to your cart.");
            navigate('/login');
            return;
        }

        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = currentCart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(currentCart));
        
        if (actionType === 'buy') {
            navigate('/cart'); // Redirect to cart immediately
        } else {
            alert("Added to cart!"); // Just show a success message
        }
    }

    if (!product) {
        return <Loading />
    }

    return (
        <div>
            <div className='flex flex-col gap-2 lg:flex-row'>
                <div className='flex relative justify-center bg-stone-100 p-4 lg:p-8'>
                    <img className='min-w-60 lg:w-96' src={product.image} alt={product.title} />
                    <div className="absolute right-0 bottom-0 text-3xl p-2">
                        <Ratings product={product} />
                    </div>
                </div>
                <div className='p-2 flex flex-col justify-center'>
                    <h2 className='text-4xl font-medium'>{product.title}</h2>
                    <p className='text-xl text-stone-500 font-medium mt-2'>{product.category}</p>
                    <p className='text-green-600 font-bold text-3xl my-6'>&#36;{product.price}</p>
                    <p className='font-medium text-gray-700 leading-relaxed mb-8'>{product.description}</p>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleCartAction('add')}
                            className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors w-full sm:w-auto"
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={() => handleCartAction('buy')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full sm:w-auto"
                        >
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
            <div className='p-2 mt-12 lg:mt-16'>
                <h3 className='text-2xl font-bold mb-6 text-gray-800'>More in this category</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                    {sameCategoryProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage