import { useEffect, useRef, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { doctors_api, files_api } from "@/lib/api"
import { toast } from "react-toastify"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../ui/input"
import { UserAvatar } from "../global/user-avatar"
import { Button } from "../ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { validate_doctor } from "@/slice/doctor/credential_slice"

export const UpdateDoctorProfile = ({ children }: { children: React.ReactNode }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.doctor_auth);
    const [profileImg, setProfileImg] = useState<string | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)
    const [name, setName] = useState<string | null>(data?.name)

    useEffect(() => {
        if (data?.profile_image) {
            setProfileImg(data.profile_image)
            setName(data?.name)
        }
    }, [data])

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
        const obj:any  = {}
        if(name === data?.name && data.profile_image === profileImg){
            return
        }
        obj.name = name
        obj.profile_image = profileImg
        setIsSubmitting(true)
        const res = await doctors_api.update(obj, data?._id)
        setIsSubmitting(false)
        if(res.success){
            toast.success(res.message)
            dispatch(validate_doctor())
            closeRef.current?.click()
        }else{
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
                    <Input placeholder="Enter name" value={name || ''} onChange={(e) => setName(e.target.value)} />
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
                        <strong>Average Rating :</strong>
                        <span> {data?.avg_rating}</span>
                    </div>
                    <div>
                        <strong>Total Reviews :</strong>
                        <span> {data?.total_rating}</span>
                    </div>
                    <div>
                        <strong>Experience :</strong>
                        <span> {data?.experience}</span>
                    </div>
                </div>
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