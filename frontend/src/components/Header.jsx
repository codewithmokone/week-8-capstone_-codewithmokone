import { useEffect, useState } from "react"

export default function Header () {
    const [user,setUser] = useState();

    useEffect(()=>{
        const fetchLocalData = () => {
            const userInfo = JSON.parse(localStorage.getItem('user'));
            setUser(userInfo);
        }

        fetchLocalData();
    },[]);

    return (
        <header className="h-[80px] bg-gray-600 flex items-center justify-between p-6">
            <div>
               {/* <h1 className="font-bold text-2xl ml-4">Logo</h1> */}
            </div>
           <div className="flex items-center gap-4">
                <p className="text-white">{user?.fullName}</p>
                {/* <img className="w-8 h-8 border bg-black rounded-[100%]" src="#" alt="" /> */}
           </div>
        </header>
    )
}