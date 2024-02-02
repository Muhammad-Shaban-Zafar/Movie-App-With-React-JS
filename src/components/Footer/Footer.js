import React, { useState } from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <>
            <div className='bg-white text-center shadow'>
                <div className="container">
                    <p className='pt-3 fw-bold'>
                        <span className='border-start border-end px-3'>&copy;{year}. All Rights Reserved</span>
                    </p>
                </div>
            </div>
        </>
    )
}
