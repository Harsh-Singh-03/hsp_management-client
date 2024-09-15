import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { review_api } from "@/lib/api"
import { toast } from "react-toastify"


interface props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
}

export const DoctorReviewModal = ({ open, setOpen, id }: props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const closeRef = useRef<HTMLButtonElement | null>(null)
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")

    const onSubmit = async(e: any) => {
        e.preventDefault()
        if(!rating || Number(rating) > 5){
            toast.info("Please select valid rating 1 to 5!")
            return
        }
        setIsSubmitting(true)
        const obj = {
            doctor: id,
            rating: Number(rating),
            review,
        }
        const res = await review_api.add(obj)
        if(res.success) {
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
        setOpen(false)
        setIsSubmitting(false)
        setRating("")
        setReview("")
    }

    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Add a review</DialogTitle>
                    <DialogDescription className="text-center">Detailed information about the appointment.</DialogDescription>
                </DialogHeader>
                <form className="p-4 pt-0" onSubmit={onSubmit}>
                    <Label>Rating Count :</Label>
                    <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Enter rating" className="mt-2 mb-4" required />
                    <Label>Describe Review:</Label>
                    <Textarea placeholder="Describe review.." rows={3} value={review} onChange={(e) => setReview(e.target.value)} className="mt-2"  />
                    <div className="flex items-center justify-end gap-4 p-4 mt-6 bg-neutral-100">
                        <DialogClose ref={closeRef} >
                            <Button type="button" variant='second' disabled={isSubmitting}>Close</Button>
                        </DialogClose>
                        <Button type="submit" variant='primary' disabled={isSubmitting} >Add</Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}