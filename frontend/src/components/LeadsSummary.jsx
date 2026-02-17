import { useMemo } from "react";
import { useGetUsersQuery } from "../redux/Api/UserApi";
import { FaUser } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { TbShieldCancel } from "react-icons/tb";
import { useParams } from "react-router";
import { useGetAdminQuery } from "../redux/Api/Admin";

const LeadsSummary = () => {
    const { status } = useParams()
    const { data: admin } = useGetAdminQuery()
    const { data: active } = useGetUsersQuery({ status: "Active", adminId: admin?.data?._id }, {
        skip: !admin?.data?._id,
    });
    const { data: followup } = useGetUsersQuery({ status: "Follow Up", adminId: admin?.data?._id }, {
        skip: !admin?.data?._id,
    });
    const { data: client } = useGetUsersQuery({ status: "Client", adminId: admin?.data?._id }, {
        skip: !admin?.data?._id,
    });
    const { data: student } = useGetUsersQuery({ status: "Student", adminId: admin?.data?._id }, {
        skip: !admin?.data?._id,
    });
    const { data: uncategorized } = useGetUsersQuery({ status: "Uncategorized", adminId: admin?.data?._id }, {
        skip: !admin?.data?._id,
    });


    const statuses = useMemo(() => {
        return [
            { key: "Active", total: active?.data?.pagination?.total ?? 0, icon: <FaUser size={20} /> },
            { key: "Follow Up", total: followup?.data?.pagination?.total ?? 0, icon: <FaLocationArrow size={20} /> },
            { key: "Client", total: client?.data?.pagination?.total ?? 0, icon: <FaChalkboardUser size={24} /> },
            { key: "Student", total: student?.data?.pagination?.total ?? 0, icon: <PiStudentBold size={24} /> },
            { key: "Uncategorized", total: uncategorized?.data?.pagination?.total ?? 0, icon: <TbShieldCancel size={24} /> },
        ];
    }, [status, client, active, followup, student, uncategorized])

    return (
        <>
            <div className="flex justify-between my-3 items-center px-4">
                <h3 className="text-xl text-white font-semibold">Summary</h3>
            </div>
            <div className="flex gap-4 mx-4 flex-wrap">
                {statuses.map((stat) => (
                    <div
                        key={stat.key}
                        className="bg-white/5 text-white flex flex-col shadow-md items-center justify-around rounded-lg p-6 flex-1"
                    >

                        <p className="text-3xl font-bold text-center">
                            {stat.total}
                        </p>
                        <p className="text-2xl flex gap-2 items-center pb-2 font-semibold">
                            <span>{stat.icon}</span>
                            <span className="line-clamp-1">{stat.key}</span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default LeadsSummary;
