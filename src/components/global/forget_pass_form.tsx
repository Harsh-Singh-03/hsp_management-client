import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { admin_credentials, doctors_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"

const formSchema = z.object({
    email: z.string().email({
        message: 'Please eneter an valid email address'
    }),
})

export const ForgetPassForm = ({page}: {page: 'doctor' | 'admin' | 'patient'}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        let data:any ;
        
        if(page === 'admin'){
            data = await admin_credentials.forget_pass(values)
        }else if(page === 'doctor'){
            data = await doctors_api.forget_pass(values)
        }else{
            data = await patient_api.forget_pass(values)
        }
        setIsSubmitting(false)
        if(data.success) {
            form.reset()
            toast.success(data.message)
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
                </div>
                <div className="w-full mt-6">
                    <Button type="submit" variant='default' className="w-full" disabled={isSubmitting}>
                        {/* <LogIn className="w-5 h-5 mr-2" /> */}
                       Request New Pass
                    </Button>
                </div>
            </form>
        </Form>
    )
}