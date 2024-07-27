import { LoginForm } from "@/components/admin/form/login-from"
import { validate_doctor } from "@/slice/doctor/credential_slice";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DoctorLogin = () => {
    const { isLoggedIn, loading } = useSelector((state: RootState) => state.doctor_auth);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/doctor')
        }
        if(loading === true && !isLoggedIn){
            dispatch(validate_doctor())
        }
    }, [isLoggedIn, loading])

    if(loading){
        return null
    }

    if(loading === false && isLoggedIn === false){
        return (
            <div className="flex w-screen gap-12 h-svh">
                <div className="w-[55%] border-r bg-neutral-100 hidden md:block">
    
                </div>
                <div className="flex flex-col items-center justify-center flex-1 w-full px-4 md:items-start md:px-0 md:pr-4">
                    <h2 className="mb-6 text-2xl font-bold tracking-wide">DOCTOR LOGIN</h2>
                    <LoginForm page="doctor" />
                </div>
            </div>
        )
    }else{
        return null;
    }

}