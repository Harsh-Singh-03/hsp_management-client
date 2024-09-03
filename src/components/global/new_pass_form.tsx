import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { admin_credentials, doctors_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const formSchema = z.object({
    password: z.string().min(8, {
        message: 'password must be at least 8 characters'
    }),
    confirm_password: z.string().min(8, {
        message: 'password must be at least 8 characters'
    }),
})

export const NewPassForm = ({ page }: { page: 'doctor' | 'admin' | 'patient' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {id, token} = useParams()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirm_password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        let data: any;
        if(values.password !== values.confirm_password){
            toast.error('Passwords do not match')
            return
        }

        const obj: any = {...values}

        obj.id = id
        obj.token = token

        if (page === 'admin') {
            data = await admin_credentials.new_pass(obj)
        } else if (page === 'doctor') {
            data = await doctors_api.new_pass(obj)
        } else {
            data = await patient_api.new_pass(obj)
        }
        setIsSubmitting(false)
        if (data.success) {
            form.reset()
            toast.success(data.message)
            if(page === 'admin') {
                navigate('/admin/login', {replace: true})
            }
            if(page === 'doctor') {
                navigate('/doctor/login', {replace: true})
            }
            if(page === 'patient') {
                navigate('/patient/login', {replace: true})
            }
        } else {
            toast.error(data.message)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-96">
                <div className="space-y-4">
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
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confurm Password :</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm passoword.." {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full mt-6">
                    <Button type="submit" variant='default' className="w-full" disabled={isSubmitting}>
                        {/* <LogIn className="w-5 h-5 mr-2" /> */}
                        Set New Password
                    </Button>
                </div>
            </form>
        </Form>
    )
}