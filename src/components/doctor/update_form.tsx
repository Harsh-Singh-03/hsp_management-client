import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { appointment_api } from "@/lib/api"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { doctor_appointment_list } from "@/slice/doctor/appointment_slice"

const formSchema = z.object({
    remarks: z.string().optional(),
    status: z.string().min(1, {
        message: 'Status is required.',
    }),
})

export const AppointmentStatusUpdate = ({ appointment_id }: { appointment_id: string }) => {

    const closeRef = useRef<HTMLButtonElement | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    const doctor = useSelector((state: RootState) => state.doctor_auth);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            remarks: '',
            status: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        const data = await appointment_api.addHistory(appointment_id, values)
        setIsSubmitting(false)
        if (data?.success === true) {
            toast.success(data.message)
            dispatch(doctor_appointment_list({doctor_id: doctor.data?._id}));
            closeRef.current?.click()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="px-4 space-y-4">
                    <Controller
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Assign department :</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admitted">Admitted</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Textarea rows={3} placeholder="Remarks .." {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    <DialogClose ref={closeRef}>
                        <Button type="button" variant='second' disabled={isSubmitting}>Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='primary' disabled={isSubmitting}>Update</Button>
                </div>
            </form>
        </Form>
    )
}