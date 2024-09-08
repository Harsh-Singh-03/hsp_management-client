import { CalendarClock, HeartHandshake, Hospital, LayoutDashboard, SquareActivity, Stethoscope, Users } from "lucide-react";


export const admin_sidebar = [
    {
        title: 'Overview',
        url: '/admin',
        icon: LayoutDashboard
    },
    {
        title: 'Appointments',
        url: '/admin/appointments',
        icon: CalendarClock
    },
    {
        title: 'Patients',
        url: '/admin/patients',
        icon: SquareActivity
    },
    {
        title: 'Doctors',
        url: '/admin/doctors',
        icon: Stethoscope
    },
    {
        title: 'Departments',
        url: '/admin/department',
        icon: Hospital
    },
    // {
    //     title: 'Managers',
    //     url: '#',
    //     icon: Users
    // },
    {
        title: 'Support',
        url: '/admin/support',
        icon: HeartHandshake
    },
]