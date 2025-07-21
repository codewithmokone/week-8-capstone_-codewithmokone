import React from 'react'
import { Card } from '../components/Card'
import {
  PlusIcon,
  CalendarIcon,
  BookOpenIcon,
  MusicIcon,
  PaletteIcon,
  HeartIcon,
  UsersIcon,
} from 'lucide-react'
export const Activities = () => {
  const activities = [
    {
      id: 1,
      name: 'Morning Circle Time',
      category: 'Education',
      icon: BookOpenIcon,
      color: 'blue',
      description:
        'Daily gathering to greet each other and discuss the day ahead',
      time: '9:00 AM - 9:30 AM',
      group: 'All Groups',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Art Project: Finger Painting',
      category: 'Art',
      icon: PaletteIcon,
      color: 'blue',
      description:
        'Creative expression through finger painting with washable paints',
      time: '10:00 AM - 11:00 AM',
      group: 'Butterflies',
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Music and Movement',
      category: 'Music',
      icon: MusicIcon,
      color: 'blue',
      description: 'Dancing and singing to develop motor skills and rhythm',
      time: '11:00 AM - 11:30 AM',
      group: 'Bumblebees',
      status: 'Upcoming',
    },
    {
      id: 4,
      name: 'Outdoor Play',
      category: 'Physical',
      icon: HeartIcon,
      color: 'green',
      description: 'Free play in the playground to develop gross motor skills',
      time: '3:00 PM - 4:00 PM',
      group: 'All Groups',
      status: 'Upcoming',
    },
  ]

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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Activity
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <BookOpenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Educational Activities
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <PaletteIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Art & Craft Activities
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">8</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-pink-100 rounded-md p-3">
                <MusicIcon className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Music Activities
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">5</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <HeartIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Physical Activities
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">7</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-md bg-${activity.color}-100 flex items-center justify-center`}
                    >
                      <activity.icon
                        className={`h-6 w-6 text-${activity.color}-600`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.name}
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
                  <div className="mt-2 flex items-center text-sm sm:mt-0">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View details
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Card title="Weekly Activity Planning">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">
              This Week's Theme: Ocean Explorers
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Learning about ocean animals, water, and conservation through
              play-based activities.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Monday</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-gray-700">Ocean sensory bins</li>
                <li className="text-sm text-gray-700">Fish counting game</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Tuesday</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-gray-700">Jellyfish craft</li>
                <li className="text-sm text-gray-700">Ocean stories</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Wednesday</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-gray-700">Water play</li>
                <li className="text-sm text-gray-700">Shark movement game</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Thursday</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-gray-700">
                  Ocean cleanup activity
                </li>
                <li className="text-sm text-gray-700">Sea animal songs</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Friday</h4>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-gray-700">Beach day</li>
                <li className="text-sm text-gray-700">Ocean snacks</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
