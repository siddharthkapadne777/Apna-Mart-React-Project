import React from 'react'

const Ratings = ({product}) => {
    return (
        <div>
            <div className='text-amber-400 text-[inherit] border flex font-medium px-4 rounded-full bg-stone-50'>{product.rating.rate}&#9733;<div className='w-[1px] bg-amber-400 m-1'></div>{product.rating.count}</div>
        </div>
    )
}

export default Ratings