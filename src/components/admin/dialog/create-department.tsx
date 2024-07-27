import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DepartmentForm } from "../form/create-department"
interface props{
    children: React.ReactNode
}
export const CreateDepartment = ({children}: props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Create Department</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <DepartmentForm />
            </DialogContent>
        </Dialog>
    )
}