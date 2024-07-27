import { SideBar } from "./sidebar"
import { TopBar } from "./topbar"

interface props {
    children: React.ReactNode;
}
export const AdminLayout = ({children}: props) => {
    return (
        <div className='w-screen mx-auto bg-neutral-100 min-h-svh'>
            <TopBar />
            <SideBar />
            <section className="py-4 pr-0 lg:py-6 lg:pl-64">
                {children}
            </section>
        </div>
    )
}