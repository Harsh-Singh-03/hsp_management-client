import { Star } from "lucide-react"
import { UserAvatar } from "./user-avatar"

export const ReviewCard = ({ rev }: { rev: any }) => {
    return (
        <div className="flex gap-3">
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
}