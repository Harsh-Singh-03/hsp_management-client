import { LoginForm } from "@/components/admin/form/login-from"
import { Button } from "@/components/ui/button";
import { validate_doctor } from "@/slice/doctor/credential_slice";
import { AppDispatch, RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const DoctorLogin = () => {
    const { isLoggedIn, loading } = useSelector((state: RootState) => state.doctor_auth);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/doctor', { replace: true })
        }
        if (loading === true && !isLoggedIn) {
            dispatch(validate_doctor())
        }
    }, [isLoggedIn, loading])

    if (loading) {
        return (
            <div className="flex justify-center my-8">
                <Loader2 className="w-12 h-12 animate-spin text-neutral-600" />
            </div>
        )
    }

    if (loading === false && isLoggedIn === false) {
        return (
            <div className="relative flex justify-end w-screen gap-12 h-svh">
                <img src="/auth-bg.svg" alt="" className="absolute top-0 left-0 object-cover w-full h-full z-[-1]" />
                <div className="flex items-center justify-center w-full px-4 shadow-sm">
                    <div className="p-4 bg-white rounded-md w-full max-w-[500px]">
                    <h2 className="mb-6 text-2xl font-bold tracking-wide">DOCTOR LOGIN</h2>
                    <LoginForm page="doctor" />
                    <Button asChild variant='link'>
                        <Link to="/forget-pass/doctor">Forget Pass ?</Link>
                    </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }

}