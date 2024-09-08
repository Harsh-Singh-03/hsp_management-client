import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { support_api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

interface props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: any
}

const formSchema = z.object({
    remarks: z.string().min(2, {
        message: "Department must be at least 2 characters.",
    })
})

export const TakeActionDialog = ({ open, setOpen, initialData }: props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            remarks: '',
        },
    })

    const closeRef = useRef<HTMLButtonElement | null>(null)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!initialData){
            return
        }
        setIsSubmitting(true)
        const data = await support_api.reply(values, initialData)
        setIsSubmitting(false)
        if (data?.success === true) {
            toast.success(data?.message)
            form.reset()
            closeRef.current?.click()
        }else{
            toast.error(data?.message)
        }
    }


    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)} >
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Create Department</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-4 space-y-4">
                           
                            <FormField
                                control={form.control}
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Remarks</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="Enter remarks" {...field} disabled={isSubmitting} />
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
                            <Button type="submit" variant='primary' disabled={isSubmitting}>Send Email</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}