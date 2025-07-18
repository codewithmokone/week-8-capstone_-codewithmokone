import Aside from "../components/Aside";
import Header from "../components/Header";

export default function Staff(){
    return (
        <main className="w-screen h-screen flex">
            <Aside />
            <div className="flex flex-col">
                <Header />
                <div>

                </div>
            </div>
        </main>
    )
}