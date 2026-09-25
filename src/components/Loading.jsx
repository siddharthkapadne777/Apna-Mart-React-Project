import React from 'react'

const Loading = () => {
    return (
        <div className='w-screen overflow-hidden'>
            <section className="wrapper">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </section>
        </div>
    )
}

export default Loading