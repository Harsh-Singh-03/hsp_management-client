import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { doctors_api, files_api } from "@/lib/api"
import { toast } from "react-toastify"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dep_list } from "@/slice/admin/department_slice"
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select"
import { doctor_list } from "@/slice/admin/doctor_slice"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/components/global/user-avatar"
import { Loader2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: 'Please eneter an valid email address'
    }),
    phone: z.string().length(10, {
        message: "Phone number must be 10 characters.",
    }),
    password: z.string().min(8, {
        message: 'password must be at least 8 characters'
    }).optional(),
    specialization: z.string().min(1, {
        message: 'Specialization is required.',
    }),
    experience: z.string().min(0, {
        message: 'Experience must be a non-negative number.',
    }),
    departments: z.array(z.string()).optional(),
    profile_image: z.string().optional(),
})

interface props {
    isEdit?: boolean,
    initialData?: any,
    department?: any,
    isHome?: boolean,
}

export const OnboardingForm = ({isEdit, initialData, department, isHome}: props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.department);
    const [profileImg, setProfileImg] = useState<string | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            password: undefined,
            phone: initialData?.phone || '',
            specialization: initialData?.specialization?._id || "",
            experience: String(initialData?.experience) || '',
            departments: department || [],
            profile_image: initialData?.profile_image || ''
        },
    })

    useEffect(() => {
        if(initialData && initialData.profile_image){
            setProfileImg(initialData.profile_image)
        }
    }, [initialData])

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(dep_list())
        }
    }, [data])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        values.departments = values?.departments?.map((dep: string) => {
            const te = dep.split('-')
            return te[1]
        })
        if(profileImg){
            values.profile_image = profileImg
        }
        setIsSubmitting(true)
        let data: any;
        if(isEdit){
            delete values.password
            data = await doctors_api.update(values, initialData._id)
        }else{
            if(!values.password){
                toast.error('Password is required.')
                return
            }
            if(isHome){
                data = await doctors_api.register(values)
            }else{
                data = await doctors_api.create(values)
            }
        }
        setIsSubmitting(false)
        if(data.success) {
            closeRef.current?.click()
            form.reset()
            if(isHome){
                toast.success(data.message)
                navigate('/doctor/login')
            }else{
                toast.success(data.message)
                dispatch(doctor_list())
            }
        }else{
            toast.error(data.message)
        }
    }

    const onFileChange = async (e: any) => {
        if(e?.target?.files && e?.target.files.length > 0) {
            setFileLoading(true)
            const res = await files_api.upload(e?.target.files[0])
            setFileLoading(false)
            if(res.success) {
                setProfileImg(res.data)
                toast.success(res.message)
            }else{
                toast.error(res.message)
            }
        }
    }

    const deleteFile = async () => {
        setFileLoading(true)
        const res = await files_api.delete({files: [profileImg]})
        setFileLoading(false)
        if(res.success) {
            setProfileImg(null)
        }else{
            toast.error(res.message)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <ScrollArea className="h-[50vh]">
                    <div className="w-full px-4 space-y-4 pb-0.5">
                        <Label>Profile image (optional)</Label>
                        {!profileImg ? (
                            <Input type="file" multiple={false} onChange={onFileChange} disabled={fileLoading} />
                        ): (
                            <div className="flex items-center justify-between">
                                <UserAvatar imageUrl={profileImg} size='lg' placeholder='Anonymous' />
                                <Button type="button" variant='destructive' size='sm' disabled={fileLoading} onClick={deleteFile}>
                                    {fileLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                                    ): (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name :</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Doctor name.." {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone :</FormLabel>
                                    <FormControl>
                                        <Input type="phone" placeholder="Doctors number.." {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!isEdit && (
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
                        )}
                        <Controller
                            control={form.control}
                            name="specialization"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specialization :</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isSubmitting}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select specialization" />
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
                        {!isHome && (
                            <Controller
                               control={form.control}
                               name="departments"
                               render={({ field }) => (
                                   <FormItem>
                                       <FormLabel>Assign departments :</FormLabel>
                                       <FormControl >
                                           <MultiSelector values={field.value} onValuesChange={field.onChange} loop className="space-y-0">
                                               <MultiSelectorTrigger>
                                                   <MultiSelectorInput placeholder="Assign departments." className="text-sm" />
                                               </MultiSelectorTrigger>
                                               <MultiSelectorContent>
                                                   <MultiSelectorList className="z-[999] bg-white mt-2">
                                                       {!!data && data?.map((item, i) => (
                                                           <MultiSelectorItem value={`${item.title}-${item._id}`} key={i}>{item?.title}</MultiSelectorItem>
                                                       ))}
   
                                                   </MultiSelectorList>
                                               </MultiSelectorContent>
                                           </MultiSelector>
                                       </FormControl>
                                       <FormMessage />
                                   </FormItem>
                               )}
                           />
                        )}
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience :</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter total experience.." {...field} disabled={isSubmitting} min={0} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </ScrollArea>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    {!isHome && (
                        <DialogClose className={cn(
                            isEdit && 'hidden'
                        )} asChild>
                            <Button  ref={closeRef} type="button" variant='second' disabled={isSubmitting}>Close</Button>
                        </DialogClose>
                    )}
                    <Button type="submit" variant='primary' disabled={isSubmitting} >{isEdit ? 'Update' : isHome ? 'Register' : 'Onboard'}</Button>
                </div>
            </form>
        </Form>
    )
}