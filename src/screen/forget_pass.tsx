import { ForgetPassForm } from "@/components/global/forget_pass_form"
import { useParams } from "react-router-dom"

export const ForgetPass = () => {

    const {path} = useParams()
    const validate_path = path === 'admin' || path === 'doctor' || path === 'patient'

    if(!validate_path){
        return null
    }
    
    return (
        <div className="flex w-screen gap-12 h-svh">
            <div className="w-[55%] border-r bg-neutral-100 hidden md:block">

            </div>
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4 md:items-start md:px-0 md:pr-4">
                <h2 className="mb-6 text-2xl font-bold tracking-wide">Request For Reset Pass</h2>
                <ForgetPassForm page={path} />
            </div>
        </div>
    )

}