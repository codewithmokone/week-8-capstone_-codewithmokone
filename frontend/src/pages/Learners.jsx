import AddModal from "../components/AddModal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react'
import { LearnerContext } from "../context/LearnerContext";
import ViewModal from "../components/ViewModal";

export default function Learners() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState(null);

    const { addLearner, learnersData, error } = useContext(LearnerContext);

    console.log(learnersData);


    // const { addLearner, learnersData } = useContext(LearnerContext);

    const learnerFields = [
        { name: "fullName", placeholder: "Full Name", required: true },
        { name: "dateOfBirth", placeholder: "Date oF Birth", required: true, type: "date" },
        { name: "gender", placeholder: "Gender", required: true },
        // { name: "attendance", placeholder: "Attendance" },
        { name: "guardianName", placeholder: "Parent/Guardian Name", required: true },
        { name: "contactNumber", placeholder: "Contact Number", required: true, type: 'number' },
    ];

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return `${Math.abs(ageDate.getUTCFullYear() - 1970)} years`;
    };

    // Function for adding a new learner
    const handleAddChild = async (data) => {
        console.log(data);

        try {
            addLearner({ data });
        } catch (error) {
            error
        }



        // try {

        //     const response = await axios.post("http://localhost:4000/api/learners/register", data); // <-- your endpoint
        //     const newLearner = response.data;

        //     // Optionally: add to local state if backend doesn’t return full list
        //     setLearners((prev) => [...prev, newLearner]);

        //     // Or: refetch the full list instead
        //     // fetchChildren();

        // } catch (err) {
        //     console.error("Error adding learner:", err.response?.data || err.message);
        //     alert("Failed to add learner.");
        // }
    };

    const handleView = (type, data) => {
        setModalType(type);
        setSelectedData(data);
        setIsViewModalOpen(true);
    };

    return (
        <main className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Learners</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage children's information, attendance, and groups.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Child
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
                        placeholder="Search children..."
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
                                    Age
                                </th>
                                {/* <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Group
                                </th> */}
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Gender
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Parent/Guardian
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
                            {learnersData ? learnersData.map((child) => (
                                <tr key={child._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <span className="font-medium text-xs text-purple-800">
                                                    {child.fullName
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {child.fullName}
                                                </div>
                                            </div>
                                        </div>
                                        {/* {child.firstName}{child.lastName} */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {calculateAge(child.dateOfBirth)}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.guardianName}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.guardianName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.contactNumber ? (<>+27 {child.contactNumber}</>) : ('')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-900"
                                            onClick={()=>handleView('learner',child)}
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
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${child.group === 'Butterflies' ? 'bg-blue-100 text-blue-800' : child.group === 'Bumblebees' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                                        >
                                            {child.group}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.attendance}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.parentName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.contactInfo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-900"
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
                                    </td> */}
                                </tr>
                            )) : (<p>No added learners.</p>)}
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
                title="Add New Learner"
                fields={learnerFields}
                onSubmit={handleAddChild}
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