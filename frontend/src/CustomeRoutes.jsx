import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboarLayout from "./layout/DashboarLayout";
import ServiceList from "./pages/ServiceList";
import Status from "./pages/LeadsPage";
import LeadDetails from "./pages/LeadDetails";
import Otp from './features/forgotPassword/Otp'
import ResetPassword from "./features/forgotPassword/ResetPassword";
import NotFound from "./pages/NotFound";
import CreateAdmin from "./features/profile/CreateAdmin";
import Home from "./pages/Home";
import ViewAdmins from "./features/profile/ViewAdmins";
import ProfileLayout from "./layout/ProfileLayout";

const MyRoutes = () => {
    const token = useSelector((state) => state.admin.token);

    return (
        <Routes>
            <Route
                path="/"
                element={!token ? <MainLayout /> : <Navigate to="/dashboard" replace />}
            >
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="otp" element={<Otp />} />
                <Route path='reset-password' element={<ResetPassword />} />
            </Route>

            <Route
                path="/dashboard"
                element={token ? <DashboarLayout /> : <Navigate to="/" replace />}
            >
                <Route index element={<Dashboard />} />
                <Route path=":status" element={<Status />} />
                <Route path="lead/:id" element={<LeadDetails />} />
                <Route path="services" element={<ServiceList />} />
                <Route path='profile' element={<ProfileLayout />}>
                    <Route path='view-admin' element={<ViewAdmins />} />
                    <Route path="create-admin" element={<CreateAdmin />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MyRoutes;
