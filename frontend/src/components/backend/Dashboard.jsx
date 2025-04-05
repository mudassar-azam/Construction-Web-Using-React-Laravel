import React from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

export default function Dashboard() {
    return (
        <>
            <Header/>
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className='col-md-3'>
                            {/* sidebar  */}
                            <Sidebar/>
                        </div>
                        <div className='col-md-9 dashboard'>
                            {/* dashboard  */}
                            <div className="card shadow border-0">
                                <div className="card-body d-flex align-items-center justify-content-center">
                                    <h4>Dashboard</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
