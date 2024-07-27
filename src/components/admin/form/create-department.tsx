import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { department } from "@/lib/api"
import { AppDispatch } from "@/store"
import { useDispatch } from "react-redux"
import { dep_list } from "@/slice/admin/department_slice"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Department must be at least 2 characters.",
    }).max(30, {
        message: "Department must be at most 30 characters.",
    }),
    description: z.string().optional(),
})
interface props {
    title?: string,
    description?: string,
    isEdit?: boolean,
    id?: string,
}
export const DepartmentForm = ({ title, description, isEdit, id }: props) => {
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title || '',
            description: description || "",
        },
    })

    const closeRef = useRef<HTMLButtonElement | null>(null)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let data: any 

        if(isEdit && !id){
            return toast.error('id is required')
        }
        
        setIsSubmitting(true)
        if(isEdit && id){
            data = await department.update(id, values)
        }else{
            data = await department.create(values)
        }
        setIsSubmitting(false)
        if (data?.success === true) {
            toast.success(data?.message)
            form.reset()
            dispatch(dep_list()).unwrap();
            closeRef.current?.click()
        }else{
            toast.error(data?.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="px-4 space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Title..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={3} placeholder="Description (optional)" {...field} disabled={isSubmitting} />
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
                    <Button type="submit" variant='primary' disabled={isSubmitting}>{isEdit ? 'Update' : 'Create'}</Button>
                </div>
            </form>
        </Form>
    )
}
