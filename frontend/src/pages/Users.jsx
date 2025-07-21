import { useContext, useState } from "react";
import { PlusIcon } from 'lucide-react';
import AddModal from "../components/AddModal";
import axios from "axios";
import { UsersContext } from "../context/UserContext";
import ViewModal from "../components/ViewModal";

export default function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState(null);

    const { addUser, usersData, error } = useContext(UsersContext);


    const userFields = [
        { name: "fullname", placeholder: "Full Name", required: true },
        { name: "email", placeholder: "Email", required: true, type: "email" },
        { name: "password", placeholder: "Password", required: true, type: "password" },
    ];

    // Function for adding a new learner
    const handleAddUser = async (data) => {
        // e.preventDefault()
        console.log(data);

        try {

            const response = await axios.post("http://localhost:4000/api/user/register", data); // <-- your endpoint
            const newUser = response.data;

            // Optionally: add to local state if backend doesn’t return full list
            setUser((prev) => [...prev, newUser]);
            alert("New user added.");

            // Or: refetch the full list instead
            // fetchuserren();

        } catch (err) {
            console.error("Error adding user:", err.response?.data || err.message);
            alert("Failed to add user.");
        }
    };

    // Function for view modal inputs
    const handleView = (type, data) => {
        setModalType(type);
        setSelectedData(data);
        setIsViewModalOpen(true);
    };

    return (
        <main className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage users information.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add User
                    </button>
                </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search userren..."
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <FilterIcon className="h-4 w-4 mr-2 text-gray-500" />
                        Filter
                    </button>
                </div>
            </div> */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contact No.
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {usersData ? usersData.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <span className="font-medium text-xs text-purple-800">
                                                    {user.fullname
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.fullname}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.contactNumber ? (<>+27 {user.contactNumber}</>) : ('')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-900"
                                            onClick={() => handleView('user', user)}
                                        >
                                            View
                                        </a>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-900"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            )) : (<p className="text-center">No added learners.</p>)}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </a>
                        <a
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to{' '}
                                <span className="font-medium">8</span> of{' '}
                                <span className="font-medium">42</span> userren
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-purple-50 text-sm font-medium text-purple-600 hover:bg-gray-50"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    3
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <AddModal
                title="Add New User"
                fields={userFields}
                onSubmit={handleAddUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                type={'user'}
                data={selectedData}
            />
        </main>
    )
}