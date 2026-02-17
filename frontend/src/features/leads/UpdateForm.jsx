import React, { useEffect, useRef, useState } from 'react'

import { toast } from 'react-toastify'
import { useGetUsersQuery, useUpdateUserMutation } from '../../redux/Api/UserApi'
import { FaTrash } from 'react-icons/fa6'
import { useGetServiceQuery } from '../../redux/Api/Service'
import { FaPlus } from 'react-icons/fa'
import { formatForDateTimeInput } from '../../utils/localdatetime'
import { useGetAdminQuery } from '../../redux/Api/Admin'

const UpdateForm = ({ selectedValue, setSelectedValue }) => {
    const popupRef = useRef()

    const [updateForm, setUpdateForm] = useState({
        status: selectedValue?.user?.status,
        totalBudget: selectedValue?.user?.totalBudget,
        isFollowedUp: selectedValue?.user?.isFollowedUp,
        service: selectedValue?.user?.service,
        startDate: selectedValue?.user?.startDate,
        endDate: selectedValue?.user?.endDate,
        remarks: selectedValue?.user?.remarks,
        inquiry: selectedValue?.user?.inquiry
    })

    const { refetch } = useGetUsersQuery()
    const { data: service } = useGetServiceQuery()
    const { data: admin } = useGetAdminQuery()
    const [updateUser, { isError, error }] = useUpdateUserMutation()

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setUpdateForm((prev) => ({
            ...prev,
            [name]: name == 'isFollowedUp' ? checked : value

        }))
    }




    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await updateUser({ id: selectedValue?.user._id, data: updateForm })

            if (res?.data?.statusCode == 200) {
                refetch()
                setSelectedValue(null)
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Error Updating")
        }
    }


    useEffect(() => {
        const handleclick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedValue('')
            }
        }
        document.addEventListener('mousedown', handleclick)
        return () => {
            document.removeEventListener('mousedown', handleclick)
        }
    }, [setSelectedValue])


    return (
        <>
            <form ref={popupRef} className='font-medium' onSubmit={handleSubmit}>
                <h2 className="text-lg mb-4 font-semibold">Add More Information</h2>
                <div className='flex flex-col my-3'>
                    <select onChange={handleChange} name='status' value={updateForm?.status} className='bg-white p-2 rounded outline-0 focus:ring-1 focus:ring-primary'>
                        <option value={'Active'}>Active</option>
                        <option value={'Follow Up'}>Follow Up</option>
                        <option value={'Student'}>Student</option>
                        <option value={'Client'}>Client</option>
                        <option value={'Uncategorized'}>Uncategorized</option>
                    </select>
                </div>

                {/* follow up date */}

                {updateForm?.status == 'Follow Up' && <> <div className='flex flex-col my-3'>
                    <label>Follow up Date</label>
                    <input
                        value={updateForm?.followUp || formatForDateTimeInput(selectedValue?.user?.followUp) || ""}
                        onChange={handleChange}
                        className='p-2 bg-white focus:ring-1 focus:ring-primary outline-0 rounded'
                        type="datetime-local" name="followUp" id="" />
                </div>
                    <div className='flex flex-col my-3'>
                        <label>Inquiry For</label>
                        <select value={updateForm?.inquiry} className='bg-white outline-0 focus:ring-1 focus:ring-primary p-2 rounded' onChange={handleChange} name='inquiry'>
                            <option value={""} disabled>Select for inquiry</option>
                            <option value='course'>Course</option>
                            <option value='project'>Project</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2 flex-row my-3'>
                        <input
                            type="checkbox"
                            name="isFollowedUp"
                            onChange={handleChange}
                            checked={!!updateForm?.isFollowedUp}
                        />
                        <label htmlFor='isFollowedUp'>Is Followed up?</label>
                    </div>
                </>}

                {/* services for students*/}
                {updateForm?.status == "Student" && <div className='flex flex-col my-3'>
                    <label>Service</label>
                    <select
                        value={updateForm?.service}
                        className="outline-0 focus:ring-1 focus:ring-primary p-2 w-full rounded-lg bg-white" >
                        {service?.data.map(el => <option value={el._id}>{el.title}</option>)}
                    </select>
                </div>}

                <div className='flex flex-col my-3'>
                    <label htmlFor='remarks'>Remarks</label>
                    <input name='remarks' value={updateForm.remarks} onChange={handleChange} className='bg-white rounded p-2 outline-0 focus:ring focus:ring-primary' />
                </div>

                <div className='flex gap-3 justify-start items-center'>
                    <button
                        aria-label="Close"
                        className=' bg-gray-500 text-white rounded-lg px-4 py-2 my-2 transform transition-transform   duration-150 hover:scale-105 font-bold '
                        onClick={() => {
                            setSelectedValue(null)
                            refetch()
                        }}
                    >
                        Close
                    </button>
                    <button type="submit" className='rounded-lg py-2 px-4 bg-accent text-white  font-bold transform transition-transform  duration-150 hover:scale-105 '>Update</button>
                </div>
            </form >
        </>
    )
}

export default UpdateForm