import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { getProducts } from "../api/index"

const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div className='p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.length === 0 ? (
        <Loading />
      ) : (
        products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
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
                  <div className='text-amber-400 text-sm font-medium px-4 rounded-full bg-stone-50'>{product.rating.rate}&#9733;</div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default HomePage