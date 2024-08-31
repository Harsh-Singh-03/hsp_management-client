import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { files_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"
import { AppDispatch } from "@/store"
import { useDispatch } from "react-redux"
import { DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/components/global/user-avatar"
import { Loader2, Trash2 } from "lucide-react"
import { patient_list } from "@/slice/admin/patient_slice"
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
        message: 'Password must be at least 8 characters'
    }).optional(),
    age: z.string().min(1, {
        message: 'Age is required.',
    }),
    gender: z.string().min(1, {
        message: 'Gender is required.',
    }),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    profile_image: z.string().optional(),
})

interface props {
    isApp?: boolean
    isHome?: boolean
    onData?: Dispatch<SetStateAction<any>>
}

export const CreatePatientFrom = ({isApp, onData, isHome}: props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const [profileImg, setProfileImg] = useState<string | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            age: "",
            gender: "",
            dateOfBirth: '',
            address: '',
            profile_image: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (profileImg) {
            values.profile_image = profileImg
        }
        setIsSubmitting(true)
        let data = null
        if(isHome) {
            data = await patient_api.register(values)
        }else{
            data = await patient_api.create(values)
        }
        setIsSubmitting(false)
        if (data?.success) {
            form.reset()
            setProfileImg(null)
            toast.success(data.message)
            if(isApp){
                closeRef.current?.click()
                dispatch(patient_list())
            }else{
                if(onData !== undefined){
                    onData(data?.data)
                }
            }
            if(isHome){
                navigate('/patient/login')
            }
        } else {
            toast.error(data.message)
        }
    }

    const onFileChange = async (e: any) => {
        if (e?.target?.files && e?.target.files.length > 0) {
            setFileLoading(true)
            const res = await files_api.upload(e?.target.files[0])
            setFileLoading(false)
            if (res.success) {
                setProfileImg(res.data)
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        }
    }

    const deleteFile = async () => {
        setFileLoading(true)
        const res = await files_api.delete({ files: [profileImg] })
        setFileLoading(false)
        if (res.success) {
            setProfileImg(null)
        } else {
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
                        ) : (
                            <div className="flex items-center justify-between">
                                <UserAvatar imageUrl={profileImg} size='lg' placeholder='Anonymous' />
                                <Button type="button" variant='destructive' size='sm' disabled={fileLoading} onClick={deleteFile}>
                                    {fileLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                                    ) : (
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
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age :</FormLabel>
                                    <FormControl>
                                        <Input type="Number" placeholder="Enter age.." {...field} disabled={isSubmitting} min={1} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of birth : ( optional )</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Enter date of birth.." {...field} disabled={isSubmitting}  />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender :</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isSubmitting}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='male' >Male</SelectItem>
                                                <SelectItem value='female' >Female</SelectItem>
                                                <SelectItem value='other' >Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address : ( optional )</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter address.." {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </ScrollArea>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    {!isApp && !isHome && (
                        <DialogClose ref={closeRef} >
                            <Button type="button" variant='second' disabled={isSubmitting}>Close</Button>
                        </DialogClose>
                    )}
                    <Button type="submit" variant='primary' disabled={isSubmitting} >{isApp ? 'Next' : isHome ? 'Register' : 'Onboard'}</Button>
                </div>
            </form>
        </Form>
    )
}