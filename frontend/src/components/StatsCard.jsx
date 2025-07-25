import React from 'react'

export const StatsCard = ({
  title,
  value,
  description,
  trend,
  icon,
  color,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
      <div className="p-5">
        <div className="flex items-center">
          <div className="ml-5 w-0 flex-1">
            <dl className='flex flex-col'>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className={`flex-shrink-0 flex items-center justify-center bg-white rounded-md p-3`}>
                  {icon}
                </div>
                <div className="text-center text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  {trend === 'up' && (
                    <svg
                      className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {trend === 'down' && (
                    <svg
                      className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="sr-only">
                    {trend === 'up'
                      ? 'Increased'
                      : trend === 'down'
                        ? 'Decreased'
                        : 'Neutral'}{' '}
                    by
                  </span>
                  {description}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
