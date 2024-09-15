import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { LogIn } from "lucide-react"
import { admin_credentials, doctors_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "@/store"
import { validate_admin } from "@/slice/admin/credential_slice"
import { useDispatch } from "react-redux"
import { validate_doctor } from "@/slice/doctor/credential_slice"
import { validate_patient } from "@/slice/patient/credential_slice"

const formSchema = z.object({
    email: z.string().email({
        message: 'Please eneter an valid email address'
    }),
    password: z.string().min(8, {
        message: 'password must be at least 8 characters'
    }),
})

export const LoginForm = ({page}: {page: 'doctor' | 'admin' | 'patient'}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    // const { data, loading, error } = useSelector((state: RootState) => state.department);
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setIsSubmitting(true)
        let data:any ;
        
        if(page === 'admin'){
            data = await admin_credentials.login(values)
        }else if(page === 'doctor'){
            data = await doctors_api.login(values)
        }else{
            data = await patient_api.login(values)
        }
        setIsSubmitting(false)
        if(data.success) {
            form.reset()
            toast.success(data.message)
            if(page === 'admin'){
                dispatch(validate_admin())
                navigate('/admin', {replace: true})
            }else if(page === 'doctor'){
                dispatch(validate_doctor())
                navigate('/doctor', {replace: true})
            }else{
                dispatch(validate_patient())
                navigate('/patient', {replace: true})
            }
        }else{
            toast.error(data.message)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email :</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@example.com" {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password :</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter a passoword.." {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full mt-6">
                    <Button type="submit" variant='default' className="w-full" disabled={isSubmitting}>
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                    </Button>
                </div>
            </form>
        </Form>
    )
}