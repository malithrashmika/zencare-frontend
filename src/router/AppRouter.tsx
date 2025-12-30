import {  Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Dashboard } from "../pages/Dashboard";
import { Patients } from "@/pages/Patients";
import { Appointments } from "@/pages/Appointments";
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
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="doctors" element={<Placeholder title="Doctors" />} />
                <Route path="treatments" element={<Placeholder title="Treatments" />} />
                <Route path="billing" element={<Placeholder title="Billing" />} />
                <Route path="reports" element={<Placeholder title="Reports" />} />
                <Route path="settings" element={<Placeholder title="Settings" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}