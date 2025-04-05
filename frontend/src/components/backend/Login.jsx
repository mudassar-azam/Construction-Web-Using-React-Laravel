import React, { useContext } from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';

export default function Login() {

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const res = await fetch("http://localhost:8000/api/authenticate" , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        });
        const result = await res.json();
        if(result.status == false){
            toast.error(result.message);
        }else{
            const userInfo = {
                id : result.id,
                token : result.token
            }
            localStorage.setItem('userInfo' , JSON.stringify(userInfo))
            login(userInfo);
            navigate('/admin/dashboard');
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className="container py-5 d-flex justify-content-center">
                    <div className="login-form">
                        <div className="card shadow border-0">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h3 className='my-3'>Login Here</h3>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            {
                                            ...register('email', {
                                                required: "Email field is required"
                                            })
                                            }
                                            type="email" className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Enter email' />
                                        {
                                            errors.email && <p className='invalid-feedback py-2'>{errors.email?.message}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            {
                                            ...register('password', {
                                                required: "Password field is required"
                                            })
                                            }
                                            type="password" className={`form-control ${errors.password && 'is-invalid'}`} placeholder='Enter password' />
                                        {
                                            errors.password && <p className='invalid-feedback py-2'>{errors.password?.message}</p>
                                        }
                                    </div>

                                    <button type='submit' className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
