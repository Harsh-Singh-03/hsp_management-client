import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OnboardingForm } from "../form/onboard-form"
import { Separator } from "@/components/ui/separator"
interface props{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: any
}
export const EditDoctor = ({open , setOpen, initialData}: props) => {
    const department = initialData?.department?.map((department: any) => `${department?.title}-${department._id}`)
    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="max-w-screen-lg p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update doctor</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col-reverse gap-4 md:flex-row lg:gap-6">
                    <div className="flex-1">
                        <OnboardingForm  isEdit={true} initialData={initialData} department={department} />
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex-1">
                        
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}