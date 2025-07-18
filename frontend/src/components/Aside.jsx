import { NavLink } from "react-router-dom";

export default function Aside() {
    const links = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/learners", label: "Learners" },
        { to: "/staff", label: "Staff" },
        { to: "/learning", label: "Learning" },
        { to: "/accounts", label: "Accounts" },
        { to: "/communication", label: "Communication" },
        { to: "/settings", label: "Settings" },
    ]

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
    
    return (
        <aside className="w-fit bg-gray-600 h-screen flex flex-col gap-16 p-6">
            <div>
                <h1 className="font-bold text-2xl text-gray-500">Logo</h1>
            </div>
            <nav className="flex flex-col gap-10">
                {links.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `px-8 py-2 rounded transition-colors ${isActive
                                ? "text-gray-600 font-semibold bg-white"
                                : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
                            }`
                        }
                    >
                        {label}
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
                {/* <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700">
                    <LogOutIcon className="mr-3 h-5 w-5 text-gray-400" />
                    Log out
                </button> */}
            </div>
        </aside>
    )
}