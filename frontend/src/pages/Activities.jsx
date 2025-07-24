import React, { useContext, useEffect, useState } from 'react'
import {
  PlusIcon,
  CalendarIcon,
  UsersIcon,
} from 'lucide-react'
import { ActivityContext } from "../context/activityContext";
import AddModal from '../components/AddModal';

export default function Activities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityList, setActivityList] = useState([]);

  const { activities, addActivity } = useContext(ActivityContext)

  
  
  useEffect(() => {
    setActivityList(activities);
  }, [activities]);

  console.log(activities);

  if (!activities) return null;

  const activityFields = [
    { name: "title", placeholder: "Title", required: true },
    { name: "category", placeholder: "Category", required: true },
    { name: "description", placeholder: "Description", required: true },
    { name: "time", placeholder: "Time", required: true},
    { name: "status", placeholder: "Status", required: true },
  ];

  // Function for adding a new learner
  const handleAddActivity = async (data) => {
    try {
      addActivity(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Activity Tracker
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan, track, and manage daily activities for all age groups.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Activity
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {activityList?.length > 0 ? activityList.map((activity) => (
            <li key={activity._id}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <div
                      className={`flex-shrink-0 h-10 w-10 rounded-md bg-${activity.color}-100 flex items-center justify-center`}
                    >
                      <activity.icon
                        className={`h-6 w-6 text-${activity.color}-600`}
                      />
                    </div> */}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.category}
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${activity.status === 'Completed' ? 'bg-green-100 text-green-800' : activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>{activity.time}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>{activity.group}</p>
                    </div>
                  </div>
                  {/* <div className="mt-2 flex items-center text-sm sm:mt-0">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View details
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            </li>
          ))
            : (<div className="p-4 text-gray-500">No activities available.</div>)}
        </ul>
      </div>
      <AddModal
        title="Add Activity"
        fields={activityFields}
        onSubmit={handleAddActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
