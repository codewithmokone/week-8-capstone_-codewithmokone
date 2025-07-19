import { LogOutIcon } from 'lucide-react';

export default function Header () {
    return (
        <header className=" bg-gray-600 flex items-center justify-between p-6">
            <div>
               {/* <h1 className="font-bold text-2xl ml-4">Logo</h1> */}
            </div>
           <div className="flex items-center gap-4">
                {/* <img className="w-7 h-7 bg-gray-600 rounded-4xl" src="#" alt="" /> */}
                 <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-purple-50 hover:text-gray-600">
                    <LogOutIcon className="mr-3 h-5 w-5 text-gray-400" />
                    Log out
                </button>
           </div>
        </header>
    )
}