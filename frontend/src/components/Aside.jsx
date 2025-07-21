import { NavLink, useNavigate } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    CalendarIcon,
    ActivityIcon,
    MessageCircleIcon,
    SettingsIcon,
    HelpCircleIcon,
    LogOutIcon,
    PersonStanding,
    BriefcaseBusiness
} from 'lucide-react'

import { useEffect } from "react";
import { useState } from "react";

export default function Aside() {
    const [user, setUser] = useState([]);

    const navigate = useNavigate();

    // Fexthing user data from localstorage
    useEffect(() => {
        const fetchLocalData = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
        }

        fetchLocalData();
    }, []);

    const adminlinks = [
        { to: "/dashboard", label: "Dashboard", icon: HomeIcon, },
        { to: "/learners", label: "Learners", icon: PersonStanding, },
        { to: "/staff", label: "Staff", icon: BriefcaseBusiness, },
        { to: "/users", label: "Users", icon: UsersIcon, },
        { to: "/activities", label: "Activities", icon: ActivityIcon, },
        // { to: "/accounts", label: "Accounts", icon: HomeIcon, },
        // { to: "/settings", label: "Settings", icon: SettingsIcon, },
    ]

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: HomeIcon, },
        { to: "/learners", label: "Learners", icon: UsersIcon, },
        { to: "/activities", label: "Activities", icon: ActivityIcon, },
    ]

    // Handles links based on user role
    const reservedLinks = user.role === 'admin' ? adminlinks : links;

    // const secondaryNavigation = [
    //     {
    //         to: '/Settings',
    //         href: '/settings',
    //         icon: SettingsIcon,
    //     },
    //     {
    //         name: 'Help',
    //         href: '/help',
    //         icon: HelpCircleIcon,
    //     },
    // ]

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <aside className="w-fit bg-gray-600 h-screen flex flex-col gap-16 p-6">
            <div>
                <h1 className="font-bold text-2xl text-gray-500">BrightPath LMS</h1>
            </div>
            <div className="h-full flex flex-col justify-between">
                <nav className="flex flex-col gap-10">
                    {reservedLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.to}
                            className={({ isActive }) =>
                                `px-8 py-2 rounded transition-colors flex gap-4 ${isActive
                                    ? "text-gray-600 font-semibold bg-white"
                                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
                                }`
                            }
                        >
                            <link.icon
                            //     className={`mr-3 h-5 w-5 ${isActive ? 'text-purple-500' : 'text-gray-400'}`
                            // }
                            />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="px-2 py-4 space-y-1">
                    {/* {secondaryNavigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700"
                    >
                        <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                        {item.name}
                    </NavLink>
                ))} */}
                    <button className="flex w-full items-center px-8 py-3 text-sm font-medium text-white rounded-lg hover:bg-purple-50 hover:text-gray-600"
                        onClick={handleLogout}
                    >
                        <LogOutIcon className="mr-3 h-5 w-5 " />
                        Log out
                    </button>
                </div>
            </div>
        </aside>
    )
}