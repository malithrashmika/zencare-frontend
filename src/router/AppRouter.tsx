import {  Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Dashboard } from "../pages/Dashboard";
import { Patients } from "@/pages/Patients";
import { Appointments } from "@/pages/Appointments";
import { Doctors } from "@/pages/Doctors";
import { Billing } from "@/pages/Billing";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { authApi } from "@/services/authApi";

const ProtectedRoute = () => {
    const isAuthenticated = authApi.isAuthenticated();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const Placeholder = ({
    title
}: {
    title: string;
}) => <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">{title} Page</h3>
        <p className="text-sm text-slate-500">This page is under construction.</p>
    </div>;

export function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="treatments" element={<Placeholder title="Treatments" />} />
                    <Route path="billing" element={<Billing />} />
                    <Route path="reports" element={<Placeholder title="Reports" />} />

                    <Route path="settings" element={<Placeholder title="Settings" />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}