import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { EmployeeContext } from "../context/employeeContext";
import { UsersContext } from "../context/UserContext";
import { LearnerContext } from "../context/LearnerContext";

export default function ViewModal({ isOpen, onClose, data, type }) {
  const { deleteEmployee, updateEmployee } = useContext(EmployeeContext);
  const { deleteUser, updateUser } = useContext(UsersContext);
  const { deleteLearner, updateLearner } = useContext(LearnerContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    const updatedData = () => {
      setFormData(data);
      setIsEditing(false);
    }
    updatedData();

  }, [data]);

  if (!isOpen || !data) return null;

  // Handles delete item
  const handleDelete = async (id) => {
    try {
      switch (type) {
        case "learner":
          await deleteLearner(id);
          break;
        case "employee":
          await deleteEmployee(id);
          break;
        case "user":
          await deleteUser(id);
          break;
        default:
          alert("Unknown type");
          return;
      }

      alert("Deleted successfully.");
      onClose();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete. Please try again.");
    }
  }

  // Handle value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // function for updating 
  const handleUpdate = async () => {
    try {
      if (type === "employee") {
        await updateEmployee(formData._id, formData);
        alert("Employee updated successfully.");
        setIsEditing(false);
        onClose();
      }

      if (type === "learner") {
        await updateLearner(formData._id, formData);
        alert("Learner updated successfully.");
        setIsEditing(false);
        onClose();
      }

      if (type === "user") {
        await updateUser(formData._id, formData);
        alert("User updated successfully.");
        setIsEditing(false);
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update.");
    }
  };

  // Render details function
  const renderDetails = () => {
    console.log("Render data: ", formData);

    switch (type) {
      case "learner":
        return isEditing ? (
          <>
            <input type="text" name="fullName" value={formData?.fullName || ""} onChange={handleChange} placeholder="Full Name" className="input" />
            <input type="number" name="age" value={formData?.age || ""} onChange={handleChange} placeholder="Age" className="input" />
            <input type="text" name="gender" value={formData?.gender || ""} onChange={handleChange} placeholder="Gender" className="input" />
            <input type="text" name="guardianName" value={formData?.guardianName || ""} onChange={handleChange} placeholder="Guardian Name" className="input" />
            <input type="text" name="contactNumber" value={formData?.contactNumber || ""} onChange={handleChange} placeholder="Contact Number" className="input" />
          </>
        ) : (
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
        return isEditing ? (
          <>
            <input type="text" name="image" value={formData.image || ""} onChange={handleChange} placeholder="Image URL" className="input" />
            <input type="text" name="name" value={formData.fullName || ""} onChange={handleChange} placeholder="Name" className="input" />
            <input type="text" name="position" value={formData.position || ""} onChange={handleChange} placeholder="Position" className="input" />
            <input type="text" name="department" value={formData.department || ""} onChange={handleChange} placeholder="Department" className="input" />
            <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="input" />
            <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" className="input" />
            <input type="text" name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" className="input" />
            <input type="date" name="startDate" value={formData.startDate?.split("T")[0] || ""} onChange={handleChange} className="input" />
          </>
        ) : (
          <>
            {data.image && <img src={data.image} alt="Profile" className="w-24 h-24 object-cover rounded-full border" />}
            <p><strong>Name:</strong> {data.fullName}</p>
            <p><strong>Position:</strong> {data.position}</p>
            <p><strong>Department:</strong> {data.department}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.contactNumber}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Start Date:</strong> {data.startDate ? new Date(data.startDate).toLocaleDateString() : 'N/A'}</p>
          </>
        );
      case "user":
        return isEditing ? (
          <>
            <input type="text" name="fullName" value={formData.fullName || ""} onChange={handleChange} placeholder="Username" className="input" />
            <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="input" />
            <input type="text" name="contact" value={formData.contactNumber || ""} onChange={handleChange} placeholder="Contact" className="input" />
          </>
        ) : (
          <>
            <p><strong>Username:</strong> {data.fullName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Contact:</strong> {data.contactNumber}</p>
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
        <div className="flex flex-col space-y-2 text-gray-700">{renderDetails()}</div>
        <div className="flex gap-4 mt-6 justify-end">
          {["employee", "learner", "user"].includes(type) && (
            isEditing ? (
              <>
                <button onClick={handleUpdate} className="text-green-600">Save</button>
                <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="text-white bg-blue-600 px-6 rounded">Edit</button>
            )
          )}
          <button className="text-white bg-red-600 px-6 rounded" onClick={() => handleDelete(data._id)}>Delete</button>
        </div>
        {/* <div className="flex gap-6 mt-4">
          <button className="text-white bg-blue-600 px-6 rounded">Edit</button>
          <button className="text-white bg-red-600 px-3 rounded" onClick={() => handleDelete(data._id)}>Delete</button>
        </div> */}
      </div>
    </div>
  );
}