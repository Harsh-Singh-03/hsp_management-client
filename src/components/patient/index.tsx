import { TopBar } from "./topbar"

interface props {
    children: React.ReactNode;
}
export const PatientLayout = ({children}: props) => {
    return (
        <div className='w-screen mx-auto bg-neutral-100 min-h-svh'>
            <TopBar />
            <section className="p-4 mx-0 my-4 bg-white rounded-md md:m-4 lg:p-6 lg:m-6">
                {children}
            </section>
        </div>
    )
}