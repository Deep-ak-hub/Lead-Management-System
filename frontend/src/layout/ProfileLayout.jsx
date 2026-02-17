import { UserPlus, UserStar } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useGetAdminQuery } from "../redux/Api/Admin";

function ProfileLayout() {
  const navigate = useNavigate();
  const { data: admin } = useGetAdminQuery();

  if (admin?.data?.role !== "superadmin") {
    navigate("/");
  }
  return (
    <div>
      <ul className="flex bg-secondary/40 rounded p-1 w-fit gap-2 mx-4">
        <li>
          <NavLink
            to="view-admin"
            className={({ isActive }) =>
              `flex p-2 rounded ${isActive ? "text-accent bg-accent/30" : "bg-accent/5 text-white"}`
            }
          >
            <UserStar />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="create-admin"
            className={({ isActive }) =>
              `flex p-2 rounded ${isActive ? "text-accent bg-accent/30" : "bg-accent/5 text-white"}`
            }
          >
            <UserPlus />
          </NavLink>
        </li>
      </ul>
      <section className="my-5">
        <Outlet />
      </section>
    </div>
  );
}

export default ProfileLayout;
