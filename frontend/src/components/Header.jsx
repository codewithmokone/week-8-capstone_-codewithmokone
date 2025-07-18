import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header className="w-screen h-22 bg-gray-600 flex items-center justify-between p-6 fixed">
            <div>
               <h2>Dashboard</h2>
            </div>
           <div>
                <img className="w-7 h-7 bg-gray-600 rounded-4xl" src="" alt="" />
           </div>
        </header>
    )
}