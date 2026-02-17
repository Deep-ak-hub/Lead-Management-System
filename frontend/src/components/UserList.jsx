import { useEffect, useState } from 'react'
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Modal from 'react-modal'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'
import { toast } from 'react-toastify';
import UpdateForm from '../features/leads/UpdateForm';
import { Link } from 'react-router';
import Loading from './Loading';
import { useRef } from 'react';
import { useGetAdminQuery } from '../redux/Api/Admin';


const UserList = () => {
    const [selectedValue, setSelectedValue] = useState()
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debounceRef = useRef(null);

    const [deleteUser] = useDeleteUserMutation()
    const { data: admin } = useGetAdminQuery()
    const { data, refetch, isFetching
    } = useGetUsersQuery({
        page,
        limit: 10,
        search,
        adminId: admin?.data?._id
    }, {
        skip: !admin?.data?._id,
    });

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

    const handleSearch = (e) => {
        const value = e.target.value;

        setPage(1);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setSearch(value);
        }, 500);
    };



    return (
        <>
            <div className="w-full flex justify-start items-center px-4">
                <div className="w-full relative">
                    <div className="relative my-5 flex flex-wrap items-center justify-between">
                        <input
                            onChange={handleSearch}
                            type='search'
                            placeholder="Search leads..."
                            className='bg-white min-w-64 md:w-1/5 px-3 py-2 rounded-lg outline-0 focus:ring focus:ring-primary shadow-xl'
                        />
                        <p className='font-semibold text-white'><span>Total leads:</span>{" "}<span>{data?.data?.pagination?.total || 0}</span></p>
                    </div>
                </div>
            </div>


            <div className="relative flex flex-col w-full h-fit px-4">
                {(!isFetching && data?.data?.leads?.length > 0) && (
                    <table className="border-collapse w-full">
                        <thead className='sticky bg-accent font-bold top-0 z-0'>
                            <tr>
                                <th className="p-2 border border-slate-300">
                                    S.N
                                </th>
                                <th className="p-2 border border-slate-300">
                                    Name
                                </th>
                                <th className="hidden md:table-cell p-2 border border-slate-300">
                                    Email
                                </th>
                                <th className="p-2 border border-slate-300">
                                    Phone
                                </th>
                                <th className="p-2 border border-slate-300">
                                    Status
                                </th>
                                <th className="p-2 border border-slate-300">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white max-h-screen overflow-y-auto">
                            {
                                data?.data?.leads.map((user, index) => {
                                    return <tr key={index}>

                                        <td className="p-2 border text-center border-slate-200 ">
                                            <p className="block font-semibold text-sm text-slate-800">{index + 1}</p>
                                        </td>
                                        <td className="p-2 border text-center border-slate-200 ">
                                            <Link to={`lead/${user?._id}`} className="text-accent font-medium">{user?.name}</Link>
                                        </td>
                                        <td className="hidden md:table-cell p-2 border text-center border-slate-200 ">
                                            <p className="">{user?.email}</p>
                                        </td>
                                        <td className="p-2 border text-center border-slate-200 ">
                                            <p className="">{user?.phone}</p>
                                        </td>
                                        <td className="p-2 border truncate text-center border-slate-200">
                                            <p>{user?.status}</p>

                                        </td>
                                        <td className='p-2 border text-center border-slate-200 w-fit'>
                                            <div className="flex justify-center gap-4">
                                                <button onClick={() => setSelectedValue({ user, action: 'edit' })} className='text-accent hover:bg-accent/10 p-2 rounded'>
                                                    <FaEdit className='' />
                                                </button>
                                                <button onClick={() => setSelectedValue({ user, action: "delete" })} className='text-red-500 hover:bg-red-500/10 p-2 rounded'>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>)}
                <Modal
                    isOpen={selectedValue?.action == 'edit'}
                    onRequestClose={() => setSelectedValue(null)}
                    contentLabel="Follow up Date"
                    overlayClassName="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm"
                    className={'min-w-90 w-1/2 bg-white/5 backdrop-blur-2xl p-4 fixed top-1/2 left-1/2 text-white -translate-1/2 rounded-xl shadow-xl'}

                >
                    <UpdateForm selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                </Modal>
                <Modal
                    isOpen={selectedValue?.action == 'delete'}
                    onRequestClose={() => setSelectedValue(null)}
                    contentLabel='Are you sure to delete?'
                    overlayClassName="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/60"
                    className={'min-w-90 w-1/2 bg-white/5 backdrop-blur-2xl p-4 fixed top-1/2 left-1/2 -translate-1/2 rounded-xl shadow-xl text-white'}
                >
                    <h2 className='font-semibold text-xl mb-3'>Are you sure to delete <span className='text-red-500'>{selectedValue?.user?.name}</span>?</h2>
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.email}</span>
                    <br />
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.status}</span><br />
                    <span className='text-gray-300 my-2'>{selectedValue?.user?.phone}</span><br />
                    <div className='flex gap-3 items-center mt-3'>
                        <button onClick={() => handleDelete(selectedValue?.user?._id)} className='cursor-pointer px-4 py-2 bg-red-500 text-white rounded font-medium'>Delete</button>
                        <button onClick={() => setSelectedValue(null)} className='cursor-pointer bg-gray-500 text-white px-3 py-2 rounded'>Cancel</button>
                    </div>
                </Modal>

                {!isFetching && data?.data?.leads?.length == 0 && (
                    <span className='text-center text-secondary font-bold text-3xl'>No Records Found</span>
                )}
                {isFetching &&
                    <Loading />
                }
                {data?.data?.leads?.length > 0 && <div className='flex justify-end text-white items-center gap-3 my-4'>
                    <p>{page} / {data?.data?.pagination?.totalPage}</p>
                    <button
                        className='bg-accent px-4 py-2 text-white rounded disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed'
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        className='bg-accent px-4 py-2 text-white rounded disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed'
                        disabled={page === data?.data?.pagination?.totalPage}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        <FaArrowRight />

                    </button>
                </div>}
            </div>
        </>
    )
}

export default UserList