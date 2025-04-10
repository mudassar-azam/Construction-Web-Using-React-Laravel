import React, { useState } from 'react'
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiUrl, token } from '../../partials/http';

export default function Create() {

    const [disable , setDisable] = useState(false);
    const [imageId , setImageId] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = {...data,"imageId":imageId}
        const res = await fetch(apiUrl + 'testimonials', {
            'method': 'POST',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: JSON.stringify(newData)
        });

        const result = await res.json();
        if (result.status == true) {
            toast.success(result.message);
            navigate('/admin/testimonials');
        } else {
            toast.error(result.message);
        }
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image",file);
        setDisable(true)

        await fetch(apiUrl + 'temp-images', {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if(result.status == false){
                toast.error(result.errors.image[0]);
                setDisable(true);
            }else{
                setImageId(result.data.id);
                setDisable(false);
            }
        });
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
                                        <h4 className='h5'>Testimonials / Create</h4>
                                        <Link to="/admin/testimonials" className='btn btn-primary'>Back</Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Testimonial</label>
                                            <input
                                                {
                                                ...register('testimonial', {
                                                    required: "Testimonial field is required"
                                                })
                                                }
                                                type="text" placeholder='Testimonial' className={`form-control ${errors.testimonial && 'is-invalid'}`} />
                                            {
                                                errors.testimonial && <p className='invalid-feedback py-2'>{errors.testimonial?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Commented By</label>
                                            <input
                                                {
                                                ...register('commented_by', {
                                                    required: "Commented By field is required"
                                                })
                                                }
                                                type="text" placeholder='Commented By' className={`form-control ${errors.commented_by && 'is-invalid'}`} />
                                            {
                                                errors.commented_by && <p className='invalid-feedback py-2'>{errors.commented_by?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Image</label>
                                            <input type="file" onChange={handleFile} placeholder='Image' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Status</label>
                                            <select
                                                {
                                                ...register('status')
                                                }
                                                className='form-control'>
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>
                                        <button disabled={disable} className="btn btn-primary">Save</button>
                                    </form>
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
