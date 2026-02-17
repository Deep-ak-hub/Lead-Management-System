import React, { useState } from 'react'
import { useDeleteServiceMutation, useGetServiceQuery } from '../redux/Api/Service'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddService from '../features/service/AddService';
import UpdateService from '../features/service/UpdateService';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Loading from '../components/Loading';
import { useGetAdminQuery } from '../redux/Api/Admin';
import { toLocalDate } from '../utils/localdatetime';

const ServiceList = () => {
    const [updateService, setUpdateService] = useState()
    const [id, setId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addService, setAddService] = useState(false)

    const { data: admin } = useGetAdminQuery()
    const { data: service, refetch, isFetching } = useGetServiceQuery({ adminId: admin?.data?._id }, { skip: !admin?.data?._id })

    const [deleteService] = useDeleteServiceMutation()



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await deleteService({ id: id._id })
            refetch()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (admin?.data?.role == 'admin' && (admin?.data?.purchasedPlan != '001' || admin?.data?.purchasedPlan != '011')) {
        return (<p className='text-xl text-center text-secondary'>Cannot access this plan</p>)
    }

    return (
        <>

            <div className='flex justify-between items-center mt-10 px-4 mr-3'>
                <h2 className='text-2xl font-bold text-white'>Services</h2>
                <button onClick={() => setAddService(true)} className=' flex flex-row bg-accent items-center font-semibold rounded-lg px-4 text-white py-2 gap-2' >
                    <FaPlus />
                    Add Service
                </button>
            </div>
            <div className="relative flex flex-col w-full h-full  shadow-md rounded-lg bg-clip-border">
                <div className='mt-6 px-4'>
                    {(!isFetching && service?.data?.length > 0) && <table className='table-auto border-collapse border-gray-400 w-full p-2 my-2'>
                        <thead className='bg-accent' >
                            <tr>
                                <th className='border border-gray-300 p-2'>S.N</th>
                                <th className='border border-gray-300 p-2'>Title</th>
                                <th className='border border-gray-300 p-2'>Created At</th>
                                <th className='border border-gray-300 p-2'>Action</th>

                            </tr>
                        </thead>

                        <tbody className='bg-white text-black'>

                            {
                                service?.data?.map((items, index) => {
                                    return <tr key={index} className='*:py-3 text-center'>
                                        <td className='border border-gray-300 '>{index + 1}</td>
                                        <td className='border border-gray-300 '>{items.title}</td>
                                        <td className='border border-gray-300 '>{toLocalDate(items?.createdAt)}</td>
                                        <td className='border border-gray-300  '>
                                            <div className='flex justify-center items-center gap-4'>
                                                <button className='cursor-pointer p-2 hover:bg-accent/10 text-accent rounded hover:scale-105' onClick={() => setUpdateService(items._id)}><FaEdit size={20} /></button>
                                                <button className='cursor-pointer p-2 hover:bg-red-500/10 rounded text-red-500 hover:scale-105' onClick={() => {
                                                    setIsModalOpen(true)
                                                    setId(items)
                                                }}><MdDelete size={20} /></button>
                                            </div>

                                        </td>
                                        {
                                            (updateService === items._id) &&
                                            <UpdateService id={items._id} item={items} setUpdateService={setUpdateService} />
                                        }
                                    </tr>


                                })
                            }
                        </tbody>

                        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                            overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                            className='bg-white fixed top-1/2 left-0 right-0 bottom-0 h-fit -translate-y-1/2 p-6 rounded-lg shadow-lg w-screen md:w-96 md:mx-auto '>
                            <b>Are you sure ?</b>
                            <p>{id?.title} will be deleted.</p>
                            <div className='flex flex-row gap-3 my-5'>
                                <button className='rounded-lg border px-3 py-2 bg-red-500 text-white' onClick={handleSubmit} >Delete</button>
                                <button className='rounded-lg border px-3 py-2 bg-gray-500 text-white' onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </Modal>
                    </table>}
                    {isFetching && <Loading />}
                    {!isFetching && service?.data?.length == 0 && <span>No data found.</span>}
                </div>
            </div>

            {
                (addService === true) &&
                <AddService setAddService={setAddService} />
            }

        </>
    )
}

export default ServiceList