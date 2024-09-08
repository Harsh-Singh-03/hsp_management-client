import { doctors_api, patient_api } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export const VerifyEmail = () => {

    const {path, id, token} = useParams()
    const validate_path = path === 'doctor' || path === 'patient'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const  navigate = useNavigate()

    useEffect(() => {
        const verify_token = async () => {
            setIsSubmitting(true)
            let data: any;
    
            const obj = {
                id,
                token
            }
            if (path === 'doctor') {
                data = await doctors_api.verify_email(obj)
            } else {
                data = await patient_api.verify_email(obj)
            }
            setIsSubmitting(false)
            if (data.success) {
                toast.success(data.message)
                if(path === 'doctor') {
                    navigate('/doctor/login', {replace: true})
                }
                if(path === 'patient') {
                    navigate('/patient/login', {replace: true})
                }
            } else {
                toast.error(data.message)
            }
        }

        if(token && id && path){
            verify_token()
        }
    }, [id, token, path])

    if(!validate_path || !id || !token) {
        return null
    }

    if(isSubmitting){
        return (
            <div className="flex items-center justify-center w-full my-10">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    return null
}