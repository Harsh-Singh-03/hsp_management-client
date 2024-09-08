import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { admin_credentials, doctors_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    password: z.string().min(8, {
        message: 'password must be at least 8 characters'
    }),
    new_password: z.string().min(8, {
        message: 'new password must be at least 8 characters'
    }),
})

export const UpdatePassDialog = ({ children, page }: { children: React.ReactNode, page: 'patient' | 'admin' | 'doctor' }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            new_password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let data: any;
        if (values.password === values.new_password) {
            toast.error('Current & new password can not be same')
            return
        }
        setIsSubmitting(true)
        
        if (page === 'admin') {
            data = await admin_credentials.reset_pass(values)
        } else if (page === 'doctor') {
            data = await doctors_api.reset_pass(values)
        } else {
            data = await patient_api.reset_pass(values)
        }
        setIsSubmitting(false)
        if (data.success) {
            form.reset()
            toast.success(data.message)
            if (page === 'admin') {
                await admin_credentials.logout()
            }
            if (page === 'doctor') {
                await doctors_api.logout()
            }
            if (page === 'patient') {
                await patient_api.logout()
            }
            window.location.reload()
        } else {
            toast.error(data.message)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update Password</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <div className="w-full px-4 pb-4">
                    <Form {...form}  >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Old Password :</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Old passoword.." {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="new_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password :</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="New passoword.." {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full mt-6">
                                <Button type="submit" variant='primary' className="w-full" disabled={isSubmitting}>
                                    {/* <LogIn className="w-5 h-5 mr-2" /> */}
                                    Set New Password
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}