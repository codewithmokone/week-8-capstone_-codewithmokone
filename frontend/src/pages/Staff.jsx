import { useContext, useState } from "react";
import AddModal from "../components/AddModal";
import axios from "axios";
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react'
import { EmployeeContext } from "../context/employeeContext";
import ViewModal from "../components/ViewModal";

// const employeesList = [
//     {
//         id: 1,
//         name: 'Emma Johnson',
//         age: '4 years',
//         group: 'Butterflies',
//         attendance: '95%',
//         parentName: 'Sarah Johnson',
//         contactInfo: '(555) 123-4567',
//     },
//     {
//         id: 2,
//         name: 'Liam Smith',
//         age: '3 years',
//         group: 'Bumblebees',
//         attendance: '92%',
//         parentName: 'Michael Smith',
//         contactInfo: '(555) 234-5678',
//     },
//     {
//         id: 2,
//         name: 'Liam Smith',
//         age: '3 years',
//         group: 'Bumblebees',
//         attendance: '92%',
//         parentName: 'Michael Smith',
//         contactInfo: '(555) 234-5678',
//     },
// ]

export default function Staff() {
    // const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { employees, setEmployees } = useContext(EmployeeContext)

    const EmployeePerPage = 8;

    // Calculate pagination
    const indexOfLastEmployee = currentPage * EmployeePerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - EmployeePerPage;
    const currentEmployees = employees?.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil((employees?.length || 0) / EmployeePerPage);


    const employeeFields = [
        { name: "fullName", placeholder: "Full Name", required: true },
        { name: "position", placeholder: "Position", required: true },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "contactNumber", placeholder: "Contact", type: "number", required: true },
    ];

    const handleAddEmployee = async (data) => {
        console.log(data);

        try {
            const response = await axios.post("https://week-8-capstone-codewithmokone.onrender.com/api/employees/register", data); // <-- your endpoint
            const newEmployee = response.data;

            // Optionally: add to local state if backend doesn’t return full list
            setEmployees((prev) => [...prev, newEmployee]);

            // Or: refetch the full list instead
            // fetchChildren();

        } catch (err) {
            console.error("Error adding employee:", err.response?.data || err.message);
            alert("Failed to add employee.");
        }
    };

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
                    <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage employee's information.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add employee
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
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search Employees..."
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                    Position
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                {/* <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Contact
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Parent/Guardian
                                    </th> */}
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contact
                                </th>
                                <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >

                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentEmployees.map((employee) => (
                                <tr key={employee._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="font-medium text-xs text-blue-800">
                                                    {employee.fullName
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {employee.fullName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {employee.age}
                                        </td> */}
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${employee.group === 'Butterflies' ? 'bg-blue-100 text-blue-800' : employee.group === 'Bumblebees' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                                            >
                                                {employee.group}
                                            </span>
                                        </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.contactNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView('employee', employee)}
                                        >
                                            View
                                        </a>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    {/* <div className="flex-1 flex justify-between sm:hidden">
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
                                <span className="font-medium">42</span> children
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
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-gray-50"
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
                    </div> */}
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
                title="Add New Employee"
                fields={employeeFields}
                onSubmit={handleAddEmployee}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                type={'learner'}
                data={selectedData}
            />
        </main>
    )
}