import React, { useEffect, useState } from 'react'
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { apiUrl, token } from '../../partials/http';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function show() {

    const [testimonials, setTestimonials] = useState([]);

    const fetchTestimonials = async () => {
        const res = await fetch(apiUrl + 'testimonials', {
            'method': 'GET',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
        });

        const result = await res.json();
        setTestimonials(result.data);
    }

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const deleteTestimonial = async (id) => {
        if (confirm("Are you sure that you want to delete this testimonial ?")) {
            const res = await fetch(apiUrl + 'testimonials/' + id, {
                'method': 'DELETE',
                'headers': {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                },
            });

            const result = await res.json();
            if (result.status == true) {
                const filteredTestimonials = testimonials.filter(testimonial => testimonial.id != id)
                setTestimonials(filteredTestimonials)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className='col-md-3'>
                            {/* sidebar  */}
                            <Sidebar />
                        </div>
                        <div className='col-md-9 '>
                            {/* dashboard  */}
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='h5'>Testimonials</h4>
                                        <Link to="/admin/testimonials/create" className='btn btn-primary'>CREATE</Link>
                                    </div>
                                    <hr />
                                    <table className="table table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%', verticalAlign: 'top', textAlign: 'left' }}>Id</th>
                                                <th style={{ width: '40%', verticalAlign: 'top', textAlign: 'left' }}>Testimonial</th>
                                                <th style={{ width: '20%', verticalAlign: 'top', textAlign: 'left' }}>Commented By</th>
                                                <th style={{ width: '15%', verticalAlign: 'top', textAlign: 'left' }}>Status</th>
                                                <th style={{ width: '20%', verticalAlign: 'top', textAlign: 'left' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                testimonials && testimonials.map(testimonial => {
                                                    return (
                                                        <tr key={`testimonial-${testimonial.id}`}>
                                                            <td style={{ verticalAlign: 'top' }}>{testimonial.id}</td>
                                                            <td style={{ verticalAlign: 'top', wordWrap: 'break-word', whiteSpace: 'normal' }}>{testimonial.testimonial}</td>
                                                            <td style={{ verticalAlign: 'top' }}>{testimonial.commented_by}</td>
                                                            <td style={{ verticalAlign: 'top' }}>
                                                                {testimonial.status == 1 ? 'Active' : 'Block'}
                                                            </td>
                                                            <td style={{ verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                                    <Link
                                                                        to={`/admin/testimonials/edit/${testimonial.id}`}
                                                                        style={{
                                                                            backgroundColor: '#e83e8c',
                                                                            color: 'white',
                                                                            padding: '5px 10px',
                                                                            textDecoration: 'none',
                                                                            borderRadius: '5px',
                                                                            fontSize: '14px',
                                                                            textAlign: 'center',
                                                                            width: 'fit-content'
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => deleteTestimonial(testimonial.id)}
                                                                        style={{
                                                                            backgroundColor: '#ffc107',
                                                                            color: 'black',
                                                                            padding: '5px 10px',
                                                                            border: 'none',
                                                                            borderRadius: '5px',
                                                                            fontSize: '14px',
                                                                            cursor: 'pointer',
                                                                            width: 'fit-content'
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

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
