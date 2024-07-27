import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DepartmentForm } from "../form/create-department"
interface props{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialData: {
        title: string,
        description: string,
        id: string,
    }
}
export const EditDepartment = ({open , setOpen, initialData}: props) => {
    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Update Department</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <DepartmentForm title={initialData.title} description={initialData.description} isEdit={true} id={initialData.id} />
            </DialogContent>
        </Dialog>
    )
}