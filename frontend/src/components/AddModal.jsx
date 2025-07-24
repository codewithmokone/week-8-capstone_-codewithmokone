import React, { useState, useEffect, useContext } from "react";
import { LearnerContext } from "../context/LearnerContext";
import toast from 'react-hot-toast';

export default function AddModal({ title, fields, onSubmit, isOpen, onClose }) {
    // const {addLearner} = useContext(LearnerContext);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            const initialState = {};
            fields.forEach((field) => (initialState[field.name] = ""));
            setFormData(initialState);
        }
    }, [isOpen, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // addLearner(formData);
            onSubmit(formData);
            // Show success notification 
            toast.success('Learner Added.');
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <input
                            key={field.name}
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            className="w-full p-2 border rounded"
                        />
                    ))}
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}