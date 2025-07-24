import { useEffect, useState } from "react"

export default function Header () {
    const [user,setUser] = useState();

    useEffect(()=>{
        const fetchLocalData = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
        }

        fetchLocalData();
    },[]);

    return (
        <header className=" bg-gray-600 flex items-center justify-between p-6">
            <div>
               {/* <h1 className="font-bold text-2xl ml-4">Logo</h1> */}
            </div>
           <div className="flex items-center gap-4">
                <p className="text-white">{user?.fullname}</p>
                {/* <img className="w-8 h-8 bg-gray-600 rounded-[100%]" src="#" alt="" /> */}
           </div>
        </header>
    )
}