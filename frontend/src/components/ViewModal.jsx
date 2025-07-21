import React, { useContext } from "react";
import { X } from "lucide-react";
import { EmployeeContext } from "../context/employeeContext";

export default function ViewModal({ isOpen, onClose, data, type }) {
  const {deleteEmployee} = useContext(EmployeeContext);
  if (!isOpen || !data) return null;

  console.log(data,type);

  // Handles delete item
  const handleDelete = (id) => {
    console.log(id);
    
    deleteEmployee(id);
    alert("Deleted succefully.");
    onClose();
  }
  

  const renderDetails = () => {
    switch (type) {
      case "learner":
        return (
          <>
            <p><strong>Name:</strong> {data.fullName}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            {/* <p><strong>Attendance:</strong> {data.attendance}</p> */}
            <p><strong>Guardian Name:</strong> {data.guardianName}</p>
            <p><strong>Contact Info:</strong> +27 {data.contactNumber}</p>
          </>
        );
      case "employee":
        return (
          <>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Position:</strong> {data.position}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
          </>
        );
      case "user":
        return (
          <>
            <p><strong>Username:</strong> {data.username}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Status:</strong> {data.status}</p>
          </>
        );
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X />
        </button>
        <h2 className="text-xl font-semibold capitalize mb-4">View {type}</h2>
        <div className="space-y-2 text-gray-700">{renderDetails()}</div>
        <div className="flex gap-6">
          <button className="text-blue-500">Edit</button>
          <button className="text-red-600" onClick={()=>handleDelete(data._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}