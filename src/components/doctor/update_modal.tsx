import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AppointmentStatusUpdate } from "./update_form"

interface props{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    appointment_id: string,
}
export const AppointmentStatusUpdataDialog = ({ open, setOpen, appointment_id }: props) => {

    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="max-w-screen-sm p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Create new appointment</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>

                <AppointmentStatusUpdate appointment_id={appointment_id} />

            </DialogContent>
        </Dialog>
    )
}