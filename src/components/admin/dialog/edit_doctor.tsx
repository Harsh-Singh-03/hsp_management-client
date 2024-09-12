import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OnboardingForm } from "../form/onboard-form"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { doctors_api, review_api } from "@/lib/api"
import { UserAvatar } from "@/components/global/user-avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star } from "lucide-react"
interface props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: any
}
export const EditDoctor = ({ open, setOpen, initialData }: props) => {
    const department = initialData?.department?.map((department: any) => `${department?.title}-${department._id}`)
    const [reviews, setReviews] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            // fetch data from API
            const res = await review_api.list({
                doctor: initialData._id,
                page: 1,
                limit: 10
            })
            console.log(res)
            setReviews(res.data || null)
        }
        if (initialData && initialData._id) {
            fetchData()
        }
    }, [initialData])

    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="max-w-screen-lg p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update doctor</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col-reverse gap-4 md:flex-row lg:gap-6">
                    <div className="flex-1">
                        <OnboardingForm isEdit={true} initialData={initialData} department={department} />
                    </div>
                    <Separator orientation="vertical" className="hidden lg:block" />
                    <ScrollArea className="h-[50vh] w-full flex-1 hidden lg:block">
                        <div className="flex flex-col w-full gap-3 px-4 lg:pr-6 lg:pl-0">
                            <h4 className="mb-2 text-xl font-semibold">Reviews & Ratings :</h4>
                            {reviews?.docs?.map((rev: any, i: number) => {
                                return (
                                    <div key={i} className="flex gap-3">
                                        <div className="">
                                            <UserAvatar imageUrl={rev?.patient_image} placeholder={rev?.patient_name || 'A'} />
                                        </div>
                                        <div className="flex-1 p-3 bg-gray-100 rounded-lg">
                                            <h4 className="text-lg font-semibold">{rev?.patient_name}</h4>
                                            <div className="flex items-center gap-1">
                                                <p className="m-0">{rev?.rating}</p>
                                                <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                                            </div>
                                            <p className="mt-1 text-sm tracking-wide text-gray-700">{rev?.review || ""}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog >
    )
}