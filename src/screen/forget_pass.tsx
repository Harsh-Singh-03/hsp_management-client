import { ForgetPassForm } from "@/components/global/forget_pass_form"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"

export const ForgetPass = () => {

    const { path } = useParams()
    const validate_path = path === 'admin' || path === 'doctor' || path === 'patient'

    if (!validate_path) {
        return null
    }

    return (
        <div className="relative flex justify-end w-screen gap-12 h-svh">
            <img src="/auth-bg.svg" alt="" className="absolute top-0 left-0 object-cover w-full h-full z-[-1]" />
            <div className="flex items-center justify-center w-full px-4 shadow-sm">
                <div className="p-4 bg-white rounded-md w-full max-w-[500px]">
                    <h2 className="mb-6 text-2xl font-bold tracking-wide">Request For Reset Pass</h2>
                    <ForgetPassForm page={path} />
                    <Button asChild variant='link'>
                        <Link to={`/${path}/login`}>Sign In ?</Link>
                    </Button>
                </div>
            </div>
        </div>
    )

}