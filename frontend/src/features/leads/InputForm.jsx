import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { useAddUserMutation, useGetUsersQuery } from '../../redux/Api/UserApi';
import { useGetServiceQuery } from '../../redux/Api/Service';

const InputForm = ({ setIsModalOpen }) => {
    const { data: service } = useGetServiceQuery()
    const { refetch } = useGetUsersQuery()
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Active',
        inquiry: 'course'
    });


    const [addUser] = useAddUserMutation();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addUser({ data: values }).unwrap();
            setIsModalOpen(false);
            refetch()
            toast.success(response?.message);
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!!");
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-5 rounded-lg'>
                <div className='flex flex-col'>
                    <label className='text-lg font-semibold'>Full Name</label>
                    <input
                        type='text'
                        placeholder='Enter Full Name'
                        name='name'
                        required
                        aria-required
                        onChange={handleChange}
                        className='bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-lg font-semibold '>Email</label>
                    <input
                        type='email'
                        required
                        aria-required
                        placeholder='Enter Email'
                        name='email'
                        onChange={handleChange}
                        className='bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-lg font-semibold '>Phone</label>
                    <input
                        type='tel'
                        aria-required
                        required
                        placeholder='Enter Phone Number'
                        name='phone'
                        onChange={handleChange}
                        className='bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-lg font-semibold '>Status</label>
                    <select
                        name='status'
                        defaultValue={'Active'}
                        onChange={handleChange}
                        className='bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none'>
                        <option selected={true} value="Active">Active</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Client">Client</option>
                        <option value="Student">Student</option>
                        <option value="Cancel">Cancel</option>
                    </select>
                </div>
                {values.status == "Follow Up" &&
                    <>
                        <div className='flex flex-col'>
                            <label className='text-lg font-semibold '>Follow Up Date</label>
                            <input name="followUp" onChange={handleChange} type="datetime-local" className='px-2 py-3 bg-white border-gray-300 border rounded-lg outline-0 focus:ring focus:ring-primary' />
                        </div>
                        <div className='flex flex-col my-3'>
                            <label>Follow up for</label>
                            <select
                                className='bg-white p-2 border border-gray-300 rounded outline-0 focus:ring focus:ring-primary'
                                defaultValue={'course'} onChange={handleChange} name='inquiry'>
                                <option value='course'>Course</option>
                                <option value='project'>Project</option>
                            </select>
                        </div>
                    </>}
                {values.status == 'Student' && <div className='flex flex-col'>
                    <label className='text-lg font-semibold '>Service</label>
                    <select
                        name='service'
                        onChange={handleChange}
                        className='bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none'>
                        {service?.data?.map(el => (
                            <option value={el._id}>{el.title}</option>
                        ))}
                    </select>

                </div>}
                <button
                    type='submit'
                    className='w-full bg-accent text-white text-lg font-semibold py-2 rounded-lg hover:bg-accent/90 cursor-pointer transition-all'>
                    Submit Now
                </button>
            </form>


        </>
    );
};

export default InputForm;