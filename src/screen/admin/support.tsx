import { AdminLayout } from "@/components/admin"
import { TakeActionDialog } from "@/components/admin/dialog/taka-action-dialog"
import { HelpCard, SkeletonHelpCard } from "@/components/admin/support_card"
import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { support_api } from "@/lib/api"
import { HeartHandshake } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export const SupportPage = () => {
    const [page, setPage] = useState(1)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""
    const [pageSize, setPageSize] = useState('10')
    const [data, setData] = useState<any>(null)
    const [open, setOpen] = useState(false)
    const [initialData, setInitialData] = useState<string | null>(null)
    const [initialLoading, setInitialLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const body: any = {
                limit: Number(pageSize),
                search: searchTerm?.trim(),
                page
            }
            setInitialLoading(true)
            const res = await support_api.list(body)
            if (res.success) {
                setData(res.data)
            } else {
                toast.error(res?.message)
            }
            setInitialLoading(false)
        };

        fetchData()

    }, [pageSize, searchTerm, page]);

    const onToggle = (id: string) => {
        setInitialData(id);
        setOpen(true);
    }

    return (
        <AdminLayout>
            <div className="flex flex-col flex-1 min-h-screen gap-4 p-4 bg-white rounded-lg md:gap-6 md:p-6 md:mx-6">

                <AdminHeading title="Help & Support" Icon={HeartHandshake} IconClass="text-sky-800 stroke-[2px]" />
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

                {initialLoading && <SkeletonHelpCard />}

                {!initialLoading && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.docs?.map((doc: any, index: number) => {
                            return <HelpCard key={index} helpQuery={doc} onAction={onToggle} />
                        })}
                    </div>
                )}

                {!initialLoading && data?.docs?.length === 0 && (
                    <p className="my-6 text-base text-center text-neutral-500">No Request Found !!</p>
                )}
                
                <PaginationComponent page={1} setPage={setPage} currentPage={data?.page || 1} isNext={data?.hasNextPage || false} isPrev={data?.hasPrevPage || false} totalPages={data?.totalPages || 1} key={page} />
                <TakeActionDialog open={open} setOpen={setOpen} initialData={initialData} />
            </div>
        </AdminLayout>
    )
}