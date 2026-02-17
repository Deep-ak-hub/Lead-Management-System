import { Link, useParams } from "react-router";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/Api/UserApi";
import Modal from 'react-modal'
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import UpdateForm from "../features/leads/UpdateForm";
import Loading from "../components/Loading";
import { useGetAdminQuery } from "../redux/Api/Admin";
import { toast } from "react-toastify";

const Status = () => {
    const { status } = useParams()
    const { data: admin } = useGetAdminQuery()
    const [deleteUser] = useDeleteUserMutation()

    const [page, setPage] = useState(1)
    const [selectedValue, setSelectedValue] = useState()
    const [date, setDate] = useState(null)
    const [filter, setFilter] = useState(null)

    const { data: leads, refetch, isFetching } = useGetUsersQuery({ page, inquiry: status == 'followup' ? filter : null, date: status == 'followup' ? date : null, status: status == "followup" ? "Follow Up" : status.charAt(0).toUpperCase() + status.slice(1) }, { skip: !admin?.data?._id })

    const handleDelete = async (id) => {
        if (!id) {
            toast.error('Id required to delete lead.')
            return;
        }

        const user = await deleteUser({ id })
        if (user) {
            toast.success('Deleted')
            refetch()
            setSelectedValue(null)
        } else {
            toast.error("Error deleting")
        }
    }
    if (admin?.data?.role == 'admin' && (admin?.data?.purchasedPlan != '010' || admin?.data?.purchasedPlan != '011')) {
        return (<p className='text-xl text-center text-secondary'>Cannot access this plan</p>)
    }

    return (
        <div className="relative px-4 my-8 flex flex-col w-full rounded-lg">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{status == "followup" ? "Follow Up" : status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                    {status == 'followup' &&
                        <div className="flex text-white items-center gap-3">

                            <button className={`cursor-pointer border px-4 py-1 rounded-full ${filter == 'project' ? 'bg-accent text-white' : 'border-accent text-accent bg-white'}`}
                                onClick={() => {
                                    if (filter == 'project') setFilter(null)
                                    else setFilter('project')
                                }}>Project</button>
                            <button className={`cursor-pointer border px-4 py-1 rounded-full ${filter == 'course' ? 'bg-accent text-white' : 'border-accent text-accent bg-white'}`}
                                onClick={() => {
                                    if (filter == 'course') setFilter(null)
                                    else setFilter('course')
                                }}>Course</button>
                            <span>|</span>

                            <button className={`cursor-pointer border px-4 py-1 rounded-full   ${date ? 'bg-accent text-white' : 'border-accent text-accent bg-white'}`}
                                onClick={() => {
                                    if (date == 'today') setDate(null)
                                    else setDate('today')
                                }}>Today</button>
                        </div>
                    }
                </div>
                {(!isFetching && leads?.data?.leads?.length > 0) &&
                    (<table className="table-auto border-none border-gray-400 p-2 w-full my-6 rounded-lg ">
                        <thead className="sticky top-0 bg-accent">
                            <tr>
                                <th className="border border-gray-300 p-2">S.N</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="hidden md:table-cell border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Phone</th>
                                <th className="hidden md:table-cell border border-gray-300 p-2">{status == 'followup' ? "Follow up" : "Created At"}</th>
                                <th className="border border-gray-300 p-2">Action</th>

                            </tr>
                        </thead>

                        <tbody className="bg-white text-black">
                            {leads?.data?.leads?.map((items, index) => {
                                return (
                                    <tr key={items._id} className="text-center">
                                        <td className="border border-gray-300 p-2">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 text-accent font-medium p-2">
                                            <Link
                                                to={`../lead/${items._id}`}>
                                                {items.name}
                                            </Link>
                                        </td>
                                        <td className="hidden md:table-cell border border-gray-300 p-2">
                                            {items.email}
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            {items.phone}
                                        </td>
                                        <td className="hidden md:table-cell border border-gray-300 p-2">
                                            {status == 'followup' ? items.followUp ? new Date(items.followUp).toLocaleDateString("en-Np", {
                                                timeZone: "Asia/Kathmandu",
                                                year: "numeric",
                                                month: 'short',
                                                day: "2-digit",
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : "--" : new Date(items.createdAt).toLocaleDateString("en-Np", {
                                                timeZone: "Asia/Kathmandu",
                                                year: "numeric",
                                                month: 'short',
                                                day: "2-digit"
                                            })}
                                        </td>

                                        <td className='p-2 border text-center border-slate-200 w-fit'>
                                            <div className="flex justify-center gap-4">
                                                <button onClick={() => setSelectedValue({ user: items, action: 'edit' })} className='text-accent hover:bg-accent/10 p-2 rounded'>
                                                    <FaEdit className='' />
                                                </button>
                                                <button onClick={() => setSelectedValue({ user: items, action: "delete" })} className='text-red-500 hover:bg-red-500/10 p-2 rounded'>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>)}
                <Modal
                    isOpen={selectedValue?.action == 'edit'}
                    onRequestClose={() => setSelectedValue(null)}
                    contentLabel="Follow up Date"
                    overlayClassName="fixed backdrop-blur-sm top-0 left-0 w-full h-full bg-black/60"
                    className={'fixed top-1/2 left-1/2 -translate-1/2 w-full md:w-1/2 bg-white/5 p-5 rounded-lg text-white backdrop-blur-2xl'}
                >
                    <UpdateForm selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                </Modal>

                <Modal
                    isOpen={selectedValue?.action == 'delete'}
                    onRequestClose={() => setSelectedValue(null)}
                    contentLabel='Are you sure to delete?'
                    overlayClassName="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm"
                    className={'min-w-90 w-1/2 bg-white/5 text-white backdrop-blur-2xl p-4 fixed top-1/2 left-1/2 -translate-1/2 rounded-xl shadow-xl'}
                >
                    <h2 className='font-semibold mb-3'>Are you sure to delete <span className='text-accent'>{selectedValue?.user?.name}</span>?</h2>
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.email}</span>
                    <br />
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.status}</span><br />
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.phone}</span><br />
                    <div className='flex gap-3 items-center mt-3'>
                        <button onClick={() => handleDelete(selectedValue?.user?._id)} className='cursor-pointer px-4 py-2 bg-red-500 text-white rounded font-medium'>Delete</button>
                        <button onClick={() => setSelectedValue(null)} className='cursor-pointer bg-gray-500 text-white px-3 py-2 rounded'>Cancel</button>
                    </div>
                </Modal>

                {!isFetching && leads?.data?.leads?.length == 0 && (
                    <p className='text-center font-bold text-3xl my-6 text-gray-500'>No Records Found</p>
                )}
                {isFetching &&
                    <Loading />
                }
                {leads?.data?.leads?.length > 0 && <div className='flex justify-end items-center text-white gap-3 my-4'>
                    <p>{page} / {leads?.data?.pagination?.totalPage}</p>
                    <button
                        className='bg-accent px-4 py-2 text-white rounded disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed'
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        className='bg-accent px-4 py-2 text-white rounded disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed'
                        disabled={page === leads.data?.pagination?.totalPage}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        <FaArrowRight />
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default Status