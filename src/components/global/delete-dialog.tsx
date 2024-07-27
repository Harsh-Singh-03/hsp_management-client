import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useEffect, useRef, useState } from "react"
interface props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onDelete: (data: any) => {},
    deleteText: string,
    data: any
}
export const DeleteDialog = ({ open, setOpen, onDelete, deleteText, data }: props) => {
    const [passedData, setPassedData] = useState(data)

    useEffect(() => {
        setPassedData(data)
    }, [data])

    const closeRef = useRef<HTMLButtonElement | null>(null)
    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0 text-black bg-white">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Delete {deleteText}</DialogTitle>
                    <DialogDescription className="text-center">Are you sure want to delete {deleteText.toLowerCase()}? <br /> This action can not be undone !!</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                    <DialogClose  asChild>
                        <Button type="button" variant='second' ref={closeRef} >Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='destructive' onClick={() => { onDelete(passedData); closeRef.current?.click(); }}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}