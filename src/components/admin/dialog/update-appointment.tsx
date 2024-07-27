import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UpAppForm } from "../form/up-appointment"
interface props{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: any
}
export const UpdateAppointment = ({open , setOpen, initialData}: props) => {
    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update Appointment</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <UpAppForm initialData={initialData} />
            </DialogContent>
        </Dialog>
    )
}