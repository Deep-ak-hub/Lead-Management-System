import { Link, NavLink } from "react-router";
import { FaUsers } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaChalkboardUser, FaLocationArrow, FaUser } from "react-icons/fa6";
import { useGetAdminQuery } from "../redux/Api/Admin";
import { IoMdSettings } from "react-icons/io";
import { TbShieldCancel } from "react-icons/tb";
import { PiStudentBold } from "react-icons/pi";

// sidebar
const Sidebar = ({ setIsOpen }) => {
  const { data: admin } = useGetAdminQuery();

  const status = [
    { to: "active", label: "Active", icon: <FaUser /> },
    { to: "followup", label: "Follow Up", icon: <FaLocationArrow /> },
    { to: "client", label: "Client", icon: <FaChalkboardUser /> },
    { to: "student", label: "Student", icon: <PiStudentBold /> },
    { to: "uncategorized", label: "Uncategorized", icon: <TbShieldCancel /> },
  ];
  return (
    <>
      <div className="overflow-y-auto px-6 flex uppercase flex-col gap-6">
        <Link
          onClick={() => setTimeout(() => setIsOpen(false), 0)}
          to="/dashboard"
          className={`flex items-center gap-3 mt-10 md:mt-0 font-bold text-accent text-xl`}
        >
          <MdOutlineSpaceDashboard />
          Dashboard
        </Link>
        <div>
          <span className="text-white flex items-center flex-row gap-3 font-bold text-xl">
            <FaUsers />
            Manage Leads
          </span>
          <div className="mt-3 flex gap-2 flex-col">
            {status.map((el, index) => (
              <NavLink
                key={el.label}
                onClick={() => setTimeout(() => setIsOpen(false), 0)}
                to={el.to}
                className={({ isActive }) =>
                  `hover:text-accent flex items-center gap-2 p-1 transition-all duration-300 ${
                    isActive
                      ? "bg-accent/10 rounded-r-lg text-accent font-semibold border-l-4 px-2"
                      : "text-white"
                  }`
                }
              >
                {el.icon}
                {el.label}
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink
          to="services"
          onClick={() => setTimeout(() => setIsOpen(false), 0)}
          className={({ isActive }) =>
            `pl-1 flex text-xl items-center gap-3 hover:text-accent transition font-semibold duration-300 ${
              isActive ? "text-accent " : "text-white"
            }`
          }
        >
          <IoMdSettings />
          Services
        </NavLink>
      </div>

      <div className="flex gap-2 px-3 pt-2 border-t border-white/30 items-center">
        <FaUser size={36} className="rounded-lg text-accent bg-accent/30 p-2" />
        <div className="flex flex-col items-start text-left">
          <Link
            onClick={() => setTimeout(() => setIsOpen(false), 0)}
            to={
              admin?.data?.role == "superadmin"
                ? "profile/create-admin"
                : "/not-found"
            }
          >
            <p className="max-w-28 text-white truncate line-clamp-1">
              {admin?.data?.email}
            </p>
            <p className="text-secondary">{admin?.data?.role}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
