import { DoctorLayout } from "@/components/doctor"
import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { ReviewCard } from "@/components/global/review-card"
import { SearchComponent } from "@/components/global/search copy"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { review_api } from "@/lib/api"
import { RootState } from "@/store"
import { CalendarClock, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export const MyReview = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""
    const { data } = useSelector((state: RootState) => state.doctor_auth);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState('10')
    const [reviews, setReviews] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            // fetch data from API
            setIsLoading(true)
            const res = await review_api.list({
                page: 1,
                doctor: data._id,
                limit: 10,
                search: searchTerm || ''
            }, 'doctor')
            if (res.success) {
                setReviews(res.data || null)
            } else {
                toast.error(res.message || '')
            }
            setIsLoading(false)
        }

        if(data && data._id){
            fetchData()
        }


    }, [data, pageSize, searchTerm, page]);


    return (
        <DoctorLayout>
            <div className="flex flex-col flex-1 min-h-screen gap-4 p-0 pr-4 bg-white rounded-lg md:gap-6 md:p-6 md:mx-6">

                <AdminHeading title="Reviews" Icon={CalendarClock} IconClass="text-sky-800 stroke-[2px]" isBack={true} />

                <Separator className="h-[0.5px] bg-neutral-200" />

                <div className="flex flex-wrap justify-between gap-4">
                    <SearchComponent />
                    <div className="flex items-center gap-4">
                        <Select defaultValue={pageSize} onValueChange={(val) => setPageSize(val)}>
                            <SelectTrigger className="w-[100px] md:w-[180px] py-1">
                                <SelectValue placeholder="Select pagesize" />
                            </SelectTrigger>
                            <SelectContent className='shadow-none'>
                                <SelectGroup>
                                    <SelectLabel>Pagesize</SelectLabel>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center h-screen">
                        <Loader2 className="text-gray-600 animate-spin" />
                    </div>
                )}

                {reviews?.docs?.map((rev: any, i: number) => {
                    return (
                        <ReviewCard key={i} rev={rev} />
                    )
                })}

                {!isLoading && reviews?.docs?.length === 0 && (
                    <div className="text-sm text-center text-gray-600">No reviews found.</div>
                )}

                <PaginationComponent page={1} setPage={setPage} currentPage={reviews?.page || 1} isNext={reviews?.hasNextPage || false} isPrev={reviews?.hasPrevPage || false} totalPages={reviews?.totalPages || 1} key={page} />
            </div>
        </DoctorLayout>
    )
}