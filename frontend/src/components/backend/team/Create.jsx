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
        const res = await fetch(apiUrl + 'team-members', {
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
            navigate('/admin/team');
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
                                        <h4 className='h5'>Team / Create</h4>
                                        <Link to="/admin/team" className='btn btn-primary'>Back</Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Name</label>
                                            <input
                                                {
                                                ...register('name', {
                                                    required: "Name field is required"
                                                })
                                                }
                                                type="text" placeholder='Name' className={`form-control ${errors.name && 'is-invalid'}`} />
                                            {
                                                errors.name && <p className='invalid-feedback py-2'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>Job Title</label>
                                            <input
                                                {
                                                ...register('job_title', {
                                                    required: "Job Title field is required"
                                                })
                                                }
                                                type="text" placeholder='Job Title' className={`form-control ${errors.job_title && 'is-invalid'}`} />
                                            {
                                                errors.job_title && <p className='invalid-feedback py-2'>{errors.job_title?.message}</p>
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
