import { useEffect, useRef, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { files_api, patient_api } from "@/lib/api"
import { toast } from "react-toastify"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../ui/input"
import { UserAvatar } from "../global/user-avatar"
import { Button } from "../ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ScrollArea } from "../ui/scroll-area"
import { validate_patient } from "@/slice/patient/credential_slice"

export const UpdatePatientProfile = ({ children }: { children: React.ReactNode }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.patient_auth);
    const [profileImg, setProfileImg] = useState<string | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)

    const [obj, setObj] = useState({
        name: '',
        age: '',
        gender: '',
        dateOfBirth: '',
        address: ''
    })

    useEffect(() => {
        if (data?.profile_image) {
            setProfileImg(data.profile_image)
            setObj({
                address: data.address || '',
                age: data.age || '',
                gender: data.gender || '',
                dateOfBirth: data.date_of_birth || '',
                name: data.name || ''
            })
        }
    }, [data])

    const onChange = (e: any) => {
        setObj({ ...obj, [e.target.name]: e.target.value })
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

    const handleSubmit = async () => {
        const data: any = {...obj}
        data.profile_image = profileImg || null
        
        setIsSubmitting(true)
        const res = await patient_api.update_profile(data)
        setIsSubmitting(false)
        if (res.success) {
            toast.success(res.message)
            dispatch(validate_patient())
            closeRef.current?.click()
        } else {
            toast.error(res.message)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-screen-sm p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update Profile</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[50vh]">
                    <div className="px-4">
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
                    </div>

                    <div className="px-4 space-y-1">
                        <Label>Name :</Label>
                        <Input placeholder="Enter name" value={obj.name || ''} onChange={onChange} name="name" />
                    </div>

                    <div className="px-4 pt-3 space-y-1">
                        <Label>Age :</Label>
                        <Input type="number" placeholder="Enter age" value={obj.age || ''} onChange={onChange} name="age" />
                    </div>

                    <div className="px-4 mt-3 space-y-1">
                        <Label>Gender :</Label>
                        <Select
                            value={obj.gender || ''}
                            onValueChange={(value) => setObj({...obj, gender: value})}
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
        
                    </div>
                    
                    <div className="px-4 pt-3 space-y-1">
                        <Label>Date of birth :</Label>
                        <Input type="date" placeholder="Enter date of birth" name="dateOfBirth" value={obj.dateOfBirth || ''} onChange={onChange} />
                    </div>

                    <div className="px-4 py-3 space-y-1">
                        <Label>Address :</Label>
                        <Input type="text" placeholder="Enter address" value={obj.address || ''} name="address" onChange={onChange} />
                    </div>

                    <div className="px-4 space-y-3">
                        <div>
                            <strong>Email :</strong>
                            <span> {data?.email}</span>
                        </div>
                        <div>
                            <strong>Phone :</strong>
                            <span> {data?.phone}</span>
                        </div>
                        <div>
                            <strong>Email verified :</strong>
                            <span> {data?.isEmailVerified ? 'Verified' : 'Not verified'}</span>
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    <DialogClose ref={closeRef}>
                        <Button type="button" variant='second' disabled={isSubmitting || fileLoading}>Close</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} variant='primary' disabled={isSubmitting || fileLoading}>Update</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}