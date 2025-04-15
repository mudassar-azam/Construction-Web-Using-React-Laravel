import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl } from '../partials/http';

export default function TeamMembers() {

    const [members, setMembers] = useState([])

    const fetchMembers = async () => {
        const res = await fetch(apiUrl + 'team-members', {
            'method': 'GET'
        });

        const result = await res.json();
        setMembers(result.data)
    }

    useEffect(() => {
        fetchMembers();
    }, [])

    return (
        <>
            <section className="section-3 bg-light py-4">
                <div className="container-fluid py-5">
                    <div className="section-header text-center">
                        <span>Team</span>
                        <h2>Our Team</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-4">
                        {
                            members && members.map(member => {
                                return (
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <div className="card shadow border-0">
                                            <div className="card-img-top">
                                                <img src={`${fileUrl}uploads/team-members/small/${member.image}`} className='w-100' />
                                            </div>
                                            <div className="card-body p-4">
                                                <div className='card-title'>
                                                    {member.name}
                                                </div>
                                                <div className='card-sub-title'>
                                                    {member.job_title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
