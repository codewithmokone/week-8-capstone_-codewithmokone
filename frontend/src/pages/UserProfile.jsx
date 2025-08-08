import { useContext, useState } from "react";
import { PencilIcon, PlusIcon } from 'lucide-react';
import AddModal from "../components/AddModal";
import axios from "axios";
import { UsersContext } from "../context/UserContext";
import ViewModal from "../components/ViewModal";

const API = import.meta.env.VITE_API_URL;

export default function UserProfile() {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState(null);

    const { userProfile, error } = useContext(UsersContext);

    // Function for view modal inputs
    const handleEditClick = () => {
        setModalType('user');
        setSelectedData(userProfile);
        setIsViewModalOpen(true);
    };

    return (
        <main className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your information.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit Info
                    </button>
                </div>
            </div>
            <div className="bg-white shadow overflow-hidden rounded-lg ">
                {userProfile ? (
                    <>
                        <div className="flex justify-center mt-8 mb-8">
                            <img className="bg-gray-500 rounded-[100%] w-60 h-60" src="" alt="" />
                        </div>
                        <ul className="space-y-2 p-4">
                            <li className="flex justify-between"><p className="font-medium">Name:</p> {userProfile.fullName}</li>
                            <li className="flex justify-between"><p className="font-medium">Email:</p> {userProfile.email}</li>
                            <li className="flex justify-between"><p className="font-medium">Role:</p> {userProfile.role}</li>
                            <li className="flex justify-between"><p className="font-medium">Contact Number:</p> {userProfile.contactNumber}</li>
                        </ul>
                    </>
                ) : (
                    <p>No user data found.</p>
                )}
            </div>
            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                type={modalType}
                data={selectedData}
            />
        </main>
    )
}