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
        { name: "department", placeholder: "Department", type: "text", },
        { name: "address", placeholder: "Home address", type: "text", required: true },
        { name: "dateHired", placeholder: "Start date", type: "date" },
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
                                    Department
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
                                    Start Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Address
                                </th>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* {employee.dateHired} */}
                                        {new Date(employee.dateHired).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.contactNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView('employee', employee)}
                                        >
                                            View
                                        </a>
                                        {/* <span className="mx-2 text-gray-300">|</span>
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </a> */}
                                    </td>
                                </tr>
                            ))}
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
                title="Add New Employee"
                fields={employeeFields}
                onSubmit={handleAddEmployee}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                type={'employee'}
                data={selectedData}
            />
        </main>
    )
}