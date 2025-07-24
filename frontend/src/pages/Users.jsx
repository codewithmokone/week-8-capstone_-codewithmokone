import { useContext, useState } from "react";
import { PlusIcon } from 'lucide-react';
import AddModal from "../components/AddModal";
import axios from "axios";
import { UsersContext } from "../context/UserContext";
import ViewModal from "../components/ViewModal";

const API = import.meta.env.VITE_API_URL;

export default function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { addUser, usersData, error } = useContext(UsersContext);

    const usersPerPage = 8;

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersData?.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil((usersData?.length || 0) / usersPerPage);


    const userFields = [
        { name: "fullname", placeholder: "Full Name", required: true },
        { name: "email", placeholder: "Email", required: true, type: "email" },
        { name: "password", placeholder: "Password", required: true, type: "password" },
        { name: "contactNumber", placeholder: "Contact", required: true, type: "number" },
    ];

    // Function for adding a new learner
    const handleAddUser = async (data) => {
        // e.preventDefault()
        console.log(data);

        try {

            const response = await axios.post(`${API}/user/register`, data);
            const newUser = response.data;

            setUser((prev) => [...prev, newUser]);
            alert("New user added.");

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

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add User
                    </button>
                </div>
            </div>
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
                                <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentUsers ? currentUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="font-medium text-xs text-blue-800">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView('user', user)}
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            )) : (<p className="text-center">No added learners.</p>)}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Previous</span>
                        &lt;
                    </button>

                    {[...Array(totalPages).keys()].map((num) => {
                        const pageNum = num + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pageNum === currentPage
                                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Next</span>
                        &gt;
                    </button>
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