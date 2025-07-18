import { Link } from "react-router-dom";

export default function Aside () {
    return (
        <aside className="w-50 bg-gray-600 h-screen flex flex-col gap-16 p-6">
            <div>
                <h1 className="font-bold text-2xl">Logo</h1>
            </div>
            <nav className="flex flex-col gap-10">
                <Link to={'dashboard'}>Dashboard</Link>
                <Link to={'learners'}>Learners</Link>
                <Link to={'staff'}>Staff</Link>
                <Link>Learning</Link>
                <Link>Accounts</Link>
                <Link>Communication</Link>
                <Link>Settings</Link>
            </nav>
        </aside>
    )
}