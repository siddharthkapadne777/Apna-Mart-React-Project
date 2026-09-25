import React from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className='product-card p-2 flex gap-4 rounded-sm bg-stone-100 relative transition-all hover:scale-102 hover:bg-stone-200 hover:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.1)]'>
                <div className='z-10'>
                    <img className='h-28 w-28 object-contain' src={product.image} alt={product.title} />
                </div>
                <div className='flex-1 z-10 flex flex-col justify-between'>
                    <div>
                        <p className='text-[12px] font-medium'>{product.title}</p>
                        <div className='text-[11px] text-stone-500'>{product.category}</div>
                        <div className='font-bold text-green-500'>&#36;{product.price}</div>
                    </div>
                    <div className='text-right z-10 flex justify-end'>
                        <Ratings product={product} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard