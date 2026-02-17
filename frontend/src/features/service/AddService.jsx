import React, { useEffect, useRef } from 'react'
import { useAddServiceMutation, useGetServiceQuery } from '../../redux/Api/Service'
import { useForm } from 'react-hook-form'
import { useGetAdminQuery } from '../../redux/Api/Admin'
import { toast } from 'react-toastify'

const AddService = ({ setAddService }) => {
    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState
    const popupRef = useRef(null)

    const [addService] = useAddServiceMutation()
    const { refetch } = useGetServiceQuery()

    const sendData = async (data) => {
        try {
            const response = await addService({ data })
            if (response?.error?.status >= 400) {
                throw new Error(response.error.data.message)
            }
            refetch()
            setAddService(false)

        } catch (error) {
            toast.error(error.message)

        }
    }

    useEffect(() => {
        const handleclick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAddService(false)
            }
        }
        document.addEventListener('mousedown', handleclick)

        return () => {
            document.removeEventListener('mousedown', handleclick)
        }
    }, [setAddService])

    return (
        <>
            <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center bg-black/5 backdrop-blur-sm">
                <div ref={popupRef} className="bg-black/50 p-6 flex rounded-lg shadow-lg w-[90%] md:w-[30%]">
                    <form onSubmit={handleSubmit(sendData)} className='w-full  text-white' noValidate>
                        <h3 className='font-semibold text-xl'>Add Service</h3>
                        <div className='flex flex-col my-3'>
                            <label htmlFor="title">Service Name</label>
                            <input type="text" placeholder='Enter The Service Tilte' className=' bg-white my-2 px-3 py-2 focus:ring-primary focus:ring-1 outline-0 rounded-lg' {...register('title', {
                                required: {
                                    value: true,
                                    message: '* This field is required. *'
                                }
                            })} />
                            <p className='text-red-600'>{errors?.title?.message}</p>
                        </div>
                        <div className='flex flex-col my-3'>
                            <label htmlFor='fee'>Fee</label>
                            <input type="number" min={0} placeholder='Enter The Service Tilte' className=' bg-white my-2 px-3 py-2 focus:ring-primary focus:ring-1 outline-0 rounded-lg' {...register('fee', {
                                required: {
                                    value: true,
                                    message: '* This field is required. *'
                                }
                            })} />
                            <p className='text-red-600'>{errors?.fee?.message}</p>
                        </div>
                        <div className='flex gap-3'>
                            <button className='rounded-lg px-4 py-2 bg-accent text-black' >
                                Add Service
                            </button>
                            <button onClick={() => setAddService('')} className='rounded-lg py-2 px-4 bg-gray-500 text-white'>
                                Cancel
                            </button>
                        </div>

                    </form>
                </div >
            </div >

        </>
    )
}

export default AddService