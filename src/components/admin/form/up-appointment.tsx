
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { appointment_api } from "@/lib/api"
import { toast } from "react-toastify"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckIcon } from "lucide-react"
import { dep_list } from "@/slice/admin/department_slice"
import { doctor_list } from "@/slice/admin/doctor_slice"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { appointment_list } from "@/slice/admin/appointment_slice"

const formSchema = z.object({
    from: z.string().min(3, {
        message: "from field required.",
    }),
    to: z.string().min(3, {
        message: "to field required.",
    }),
    department: z.string().min(1, {
        message: 'Department is required.',
    }),
    doctor: z.string().min(1, {
        message: 'Assign doctor.',
    }),
})

export const UpAppForm = ({ initialData }: { initialData: any }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.department);
    const doctorsList = useSelector((state: RootState) => state.doctors_list);
    const [open, setOpen] = useState(false)
    const [doc_list, setDocList] = useState<any[]>([])

    const closeRef = useRef<HTMLButtonElement | null>(null)

    const formatDateForDateTimeLocal = (date: any) => {
        if(!date) return null
        const Date1 = new Date(date)
        const isoString = Date1.toISOString();
        return isoString.slice(0, 16);
    };
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: formatDateForDateTimeLocal(initialData?.from) || '',
            to: formatDateForDateTimeLocal(initialData?.to) || '',
            department: initialData?.departmentId || '',
            doctor: initialData?.doctor?._id || '',
        },
    })

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(dep_list())
        }
    }, [data])

    useEffect(() => {
        if (!doctorsList?.data?.docs || doctorsList.data?.docs?.length === 0) {
            dispatch(doctor_list({ limit: 100 }))
        }
        setDocList(doctorsList?.data?.docs || [])
    }, [doctorsList])

    const changeDoc = (value: string) => {
        if (value !== '') {
            const fil_arr = doctorsList?.data?.docs.filter((doc: any) => (doc?.name?.includes(value) || doc?.email?.includes(value) || doc?.phone?.includes(value)))
            setDocList(fil_arr)
        } else {
            setDocList(doctorsList?.data?.docs || [])
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const body: any = { ...values }

        if(!initialData.from && body.from){
            body.status = "scheduled"
        }else if(new Date(body.from) !== new Date(initialData.from)){
            body.status = "re_scheduled"
        }

        setIsSubmitting(true)
        const data = await appointment_api.update(initialData._id, body)
        if (data.success === true) {
            form.reset()
            closeRef?.current?.click()
            dispatch(appointment_list()).unwrap()
            toast.success(data.message)
        } else {
            toast.warn(data.message)
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <ScrollArea className="h-[50vh]">
                    <div className="w-full px-4 space-y-4 pb-0.5">
                        <Controller
                            control={form.control}
                            name="doctor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign doctor :</FormLabel>
                                    <FormControl>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="justify-between w-full font-normal"
                                                >
                                                    {field.value
                                                        ? doctorsList?.data?.docs?.find((framework: any) => framework._id === field.value)?.name
                                                        : "Select doctor..."}
                                                    <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full min-w-full p-4">
                                                <Input type="text" placeholder="Search doctor..." className="w-full mb-3 h-9" onChange={(e) => changeDoc(e.target.value)} />
                                                {doc_list.length === 0 && (
                                                    <p className="text-center w-96">No doctor found.</p>
                                                )}
                                                <div className="w-full space-y-2">
                                                    {doc_list.map((framework: any) => (
                                                        <Button
                                                            key={framework._id}
                                                            variant='ghost'
                                                            className="w-full"
                                                            onClick={() => {
                                                                setOpen(false);
                                                                form.setValue("doctor", framework._id);
                                                                changeDoc('');
                                                            }}
                                                        >
                                                            {framework?.name}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    field.value === framework._id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </Button>
                                                    ))}
                                                </div>

                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>From :</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" placeholder="From date time.." {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>To :</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" placeholder="From date time.." {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="department"
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
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {!!data && data?.map((item, i) => (
                                                    <SelectItem value={item._id} key={i}>{item?.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                    <Button type="submit" variant='primary' disabled={isSubmitting} >Update</Button>
                </div>
            </form>
        </Form>
    )
}