import { LoginForm } from "@/components/admin/form/login-from"
import { validate_admin } from "@/slice/admin/credential_slice";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
    const { isLoggedIn, loading } = useSelector((state: RootState) => state.admin_auth);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/admin')
        }
        if(loading === true && !isLoggedIn){
            dispatch(validate_admin())
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
                    <h2 className="mb-6 text-2xl font-bold tracking-wide">ADMIN LOGIN</h2>
                    <LoginForm page="admin" />
                </div>
            </div>
        )
    }else{
        return null;
    }

}