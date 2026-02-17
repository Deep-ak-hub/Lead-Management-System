import { memo, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useGetAdminQuery } from "../redux/Api/Admin";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Slice/AdminSlice";
import Modal from "react-modal";
import InputForm from "../features/leads/InputForm";
import { FiMenu, FiX } from 'react-icons/fi';
import { TbMenu3 } from "react-icons/tb";
import Sidebar from "../components/Sidebar";
import { UserRound } from "lucide-react";


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const profileRef = useRef(null)

    const { data: admin } = useGetAdminQuery();


    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])




    return (
        <div className="flex w-full font-sans">
            {/* Left Panel (30%) */}

            {/* large screen view */}

            <div className={`sticky top-2 hidden md:flex flex-col justify-between h-[95vh] bg-black text-white shadow-xl border border-white mx-2 my-2 rounded-lg py-3`}>
                <Sidebar />
            </div>

            {/* mobile view */}
            <div className={`fixed ${isOpen ? "left-0" : "-left-full"} md:hidden duration-300 transition-all z-1 w-full h-full backdrop-blur-sm bg-black/50`}></div>

            <div className={`fixed z-10 top-2 md:hidden flex flex-col justify-between h-[97vh] bg-black shadow-xl mx-2 my-2 border border-white rounded-lg py-3  ${isOpen ? "translate-x-0 duration-150 transition-transform" : "-translate-x-100 duration-150 transition-transform"} `}>

                <Sidebar setIsOpen={setIsOpen} />
            </div>
            <button className="fixed z-40 top-5 left-5 md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FiX size={40} className="text-white bg-accent p-2 rounded-full" /> : <TbMenu3 size={40} className="text-white bg-accent p-2 rounded-full" />}</button>

            {/* Right Panel (70%) */}
            <div className="flex-1">
                <div className="flex justify-between my-4 px-4 gap-3 items-center py-10 md:py-0" >
                    <h1 className="text-white text-2xl mr-auto font-extrabold">
                        Hi, {admin?.data?.email.split('@')[0]} 👋
                    </h1>
                    <button
                        className="bg-accent cursor-pointer flex items-center flex-row py-2 px-4 gap-1 rounded-lg text-white font-semibold"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        <FaPlus />
                        Add Lead
                    </button>
                    <div ref={profileRef} className=" relative">
                        <button
                            id="profile"
                            className="cursor-pointer text-accent p-1 rounded-full"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <UserRound />
                        </button>
                        <div
                            id="profile-popup"
                            className={`absolute top-12 right-4 duration-150 bg-white/5 shadow-xl rounded-lg w-72 p-4 backdrop-blur-2xl border border-white/50 origin-top-right scale-0 z-50 ${showProfile && 'scale-100'}`}
                        >
                            <p className="text-white font-semibold">
                                {admin?.data?.role}
                            </p>
                            <p className="text-gray-300 text-sm ">
                                {admin?.data?.email}
                            </p>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer mt-3 w-fit px-6 font-semibold bg-accent text-white py-2 rounded-md tracking-wide"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    overlayClassName="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/60 "
                    className="z-40 bg-white/5 text-white backdrop-blur-2xl fixed top-1/2 left-1/2 -translate-1/2 w-full md:w-1/2 p-6 rounded-lg shadow-lg">
                    <InputForm setIsModalOpen={setIsModalOpen} />

                </Modal>

                {/* remaining part */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
