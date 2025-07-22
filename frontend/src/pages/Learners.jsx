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
    const [currentPage, setCurrentPage] = useState(1);


    const { addLearner, learnersData, error } = useContext(LearnerContext);

    const learnersPerPage = 8;

    // Calculate pagination
    const indexOfLastLearner = currentPage * learnersPerPage;
    const indexOfFirstLearner = indexOfLastLearner - learnersPerPage;
    const currentLearners = learnersData?.slice(indexOfFirstLearner, indexOfLastLearner);
    const totalPages = Math.ceil((learnersData?.length || 0) / learnersPerPage);

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
                    <h1 className="text-2xl font-semibold text-gray-900">Learners</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage children's information, attendance, and groups.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Child
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
                                <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentLearners?.length > 0 ? currentLearners.map((child) => (
                                <tr key={child._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="font-medium text-xs text-blue-800">
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
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {calculateAge(child.dateOfBirth)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.guardianName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.contactNumber ? (<>+27 {child.contactNumber}</>) : ('')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => handleView('learner', child)}
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
                            )) : (<tr><td>No added learners.</td></tr>)}
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