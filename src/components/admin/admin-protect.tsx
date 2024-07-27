import { validate_admin } from "@/slice/admin/credential_slice";
import { AppDispatch, RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"

export const ValidateAdmin = () => {
    const { isLoggedIn, loading } = useSelector((state: RootState) => state.admin_auth);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!isLoggedIn && loading === true){
            dispatch(validate_admin())
        }

        if(!isLoggedIn && loading === false){
            navigate('/admin/login');
        }
    }, [isLoggedIn, loading])

    if(loading){
        return (
            <div className="flex justify-center my-8">
                <Loader2 className="w-12 h-12 animate-spin text-neutral-600" />
            </div>
        )
    }

    if(isLoggedIn){
        return <Outlet />
    }

}