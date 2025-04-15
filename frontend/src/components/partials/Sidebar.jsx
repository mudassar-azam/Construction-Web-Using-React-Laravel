import React, { useContext } from 'react'
import { AuthContext } from '../backend/context/Auth';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const {logout} = useContext(AuthContext)
    return (
        <div className="card shadow border-0">
            <div className="card-body p-4 sidebar">
                <h4>Sidebar</h4>
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/services">Services</Link>
                    </li>
                    <li>
                        <Link to="/admin/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/admin/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/admin/testimonials">Testimonial</Link>
                    </li>
                    <li>
                        <Link to="/admin/team">Team Members</Link>
                    </li>
                    <li>
                        <button onClick={logout} className='btn btn-primary small mt-3'>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
