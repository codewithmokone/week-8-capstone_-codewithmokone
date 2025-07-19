import Aside from "../components/Aside";
import Header from "../components/Header";
import { StatsCard } from '../components/StatsCard';
import { Card } from '../components/Card'

export default function Dashboard() {
    return (
        <main className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Here's what's happening at Little Explorers Daycare
                    today.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Children"
                    value="42"
                    description="+2 from last month"
                    trend="up"
                    // icon={<UsersIcon className="h-6 w-6 text-blue-600" />}
                    color="blue"
                />
                <StatsCard
                    title="Check-ins Today"
                    value="38"
                    description="91% attendance"
                    trend="neutral"
                    // icon={<ClockIcon className="h-6 w-6 text-green-600" />}
                    color="green"
                />
                <StatsCard
                    title="Activities Planned"
                    value="8"
                    description="3 completed"
                    trend="neutral"
                    // icon={<BarChartIcon className="h-6 w-6 text-purple-600" />}
                    color="purple"
                />
                <StatsCard
                    title="Parent Messages"
                    value="12"
                    description="5 unread"
                    trend="up"
                    // icon={<CalendarIcon className="h-6 w-6 text-amber-600" />}
                    color="amber"
                />
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <Card title="Announcements" className="lg:col-span-2">
                    <div className="space-y-4">
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <h3 className="font-medium text-yellow-900">
                                Parent-Teacher Conference
                            </h3>
                            <p className="mt-1 text-sm text-yellow-800">
                                Reminder: Parent-teacher conferences are scheduled for next
                                Friday. Please prepare progress reports for each child.
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <h3 className="font-medium text-blue-900">
                                Field Trip Permission
                            </h3>
                            <p className="mt-1 text-sm text-blue-800">
                                Permission slips for the zoo field trip are due by Wednesday. 15
                                forms have been received so far.
                            </p>
                        </div>
                    </div>
                </Card>
                <Card title="Quick Actions">
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                            Take Attendance
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Add New Child
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Create Activity
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Message Parents
                        </button>
                    </div>
                </Card>
            </div>
        </main>
    )
}