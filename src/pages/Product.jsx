import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from "../api/index"
import Loading from '../components/Loading'

const Product = () => {
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
                <div className='flex justify-center bg-stone-100 p-4 lg:p-8'>
                    <img className='w-60 lg:w-96' src={product.image} alt={product.title} width="200" />
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
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {sameCategoryProducts.map((item) => (
                        <Link to={`/product/${item.id}`} key={item.id} className='block'>
                            <div className='bg-stone-100 h-full rounded-md p-2 hover:shadow-md transition'>
                                <img src={item.image} alt={item.title} className='h-28 w-full object-contain mb-2' />
                                <p className='text-sm font-medium line-clamp-2'>{item.title}</p>
                                <p className='text-green-500 font-bold mt-1'>&#36;{item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product