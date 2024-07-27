
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRef, useState } from "react"
import { appointment_api } from "@/lib/api"
import { toast } from "react-toastify"
import { DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { patient_appointment_list } from "@/slice/patient/appointment_slice"

const formSchema = z.object({
    reason: z.string().min(3, {
        message: 'reason is required.',
    }),
})

export const AppointmentPatientForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const closeRef = useRef<HTMLButtonElement | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    const patient = useSelector((state: RootState) => state.patient_auth);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        const data = await appointment_api.patient_req(values)
        if (data.success === true) {
            form.reset()
            closeRef?.current?.click()
            dispatch(patient_appointment_list({ patient_id: patient.data._id }))
            toast.success(data.message)
        } else {
            toast.warn(data.message)
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <ScrollArea className="">
                    <div className="w-full px-4 space-y-4 pb-0.5">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason :</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter reason.." rows={3} {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </ScrollArea>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    <DialogClose ref={closeRef}>
                        <Button type="button" variant='second' disabled={isSubmitting}>Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='primary' disabled={isSubmitting} >Submit</Button>
                </div>
            </form>
        </Form>
    )
}