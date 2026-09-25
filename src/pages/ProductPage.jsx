import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from "../api/index"
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Ratings from '../components/Ratings'

const ProductPage = () => {
    const { id } = useParams()
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

    if (!product) {
        return <Loading />
    }

    return (
        <div>
            <div className='flex flex-col gap-2 lg:flex-row'>
                <div className='flex relative justify-center bg-stone-100 p-4 lg:p-8'>
                    <img className='w-60 lg:w-96' src={product.image} alt={product.title} width="200" />
                    <div className="absolute right-0 bottom-0 text-3xl p-2">
                        <Ratings product={product} />
                    </div>
                </div>
                <div className='p-2'>
                    <h2 className='text-4xl font-medium'>{product.title}</h2>
                    <p className='text-xl text-stone-500 font-medium'>{product.category}</p>
                    <p className='text-green-500 font-bold text-2xl my-4'>&#36;{product.price}</p>
                    <p className='font-medium'>{product.description}</p>
                </div>
            </div>
            <div className='p-2 mt-8 lg:mt-16'>
                <h3 className='text-xl font-semibold mb-3'>More in this category</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6'>
                    {sameCategoryProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage