import React from 'react'

export default function Hero(props) {
    return (
        <>
            <section className="section-7">
                <div className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="text-left">
                            <span>Quality. Integrity. Value.</span>
                            <h1>{props.heading}</h1>
                            <p>We excel at transforming visions into <br /> reality through outstanding craftsmanship and precise</p>
                        </div>
                    </div>
                </div>
            </section>/
        </>
    )
}
