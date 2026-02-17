import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useGetServiceQuery, useUpdateServiceMutation } from '../../redux/Api/Service'
import { toast } from 'react-toastify'



const UpdateService = ({ id, setUpdateService, item }) => {
    const popupRef = useRef()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const { refetch } = useGetServiceQuery()

    const [updateService] = useUpdateServiceMutation()

    const updateData = async (data) => {
        try {
            const response = await updateService({ id, data })
            refetch()
            setUpdateService()
            toast.success('Updated successfully')

        } catch (error) {
            toast.error("Error updating")
        }
    }

    useEffect(() => {
        if (item) {
            setValue('title', item.title || '')

        }

    })

    useEffect(() => {
        const handleClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setUpdateService()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])


    return (
        <>
            <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center bg-black/50 ">
                <div ref={popupRef} className="bg-gray-100 p-6 flex rounded-lg shadow-lg w-[90%] md:w-[30%]" >
                    <form action="" onSubmit={handleSubmit(updateData)} className='w-full ' noValidate>
                        <div className='flex flex-col text-start gap-3'>
                            <h1 className='font-semibold'></h1>

                            <label htmlFor="" className='font-bold'>Service Name</label>
                            <input type="text" placeholder='update the service title' className='my-2 bg-white focus:ring-primary focus:ring-1 outline-0 px-3 py-2 rounded-lg' {...register('title', {
                                required: {
                                    value: true,
                                    message: '* This field is required. *'
                                }
                            })} />
                            <p className='text-red-600'>{errors?.title?.message}</p>
                            <div className='flex gap-3'>
                                <button className='rounded-lg py-2 px-4 bg-accent text-black' >
                                    Update
                                </button>
                                <button onClick={() => setUpdateService()} className='rounded-lg border py-2 px-4 bg-gray-500 text-white'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >


        </>
    )

}

export default UpdateService