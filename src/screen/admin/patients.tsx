import { AdminLayout } from "@/components/admin"
import { OnboardPatient } from "@/components/admin/dialog/create-patients"
import { AdminPatientTable } from "@/components/admin/table/patient_table"
import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { patient_list } from "@/slice/admin/patient_slice"
import { AppDispatch, RootState } from "@/store"
import { Plus, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export const Patients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.patients_list);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState('10')

    useEffect(() => {
        const fetchData = async () => {
            const body:any = {
                limit: Number(pageSize),
                search: searchTerm,
                page
            }
            const fetchPromise = dispatch(patient_list(body)).unwrap();
            toast.promise(
                fetchPromise,
                {
                    pending: 'Fetching data...',
                    success: 'Data fetched successfully!',
                    error: {
                        render({ data }) {
                            return `Error : ${data}`;
                        },
                    },
                }
            );
        };

        fetchData()

    }, [dispatch, pageSize, searchTerm, page]);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error]);

    return (
        <AdminLayout>
            <div className="flex flex-col flex-1 min-h-screen gap-6 p-6 mx-6 bg-white rounded-lg">

                <AdminHeading title="Patients" Icon={Users} IconClass="text-sky-800 stroke-[2px]">
                    <OnboardPatient>
                        <Button variant='primary' size='default' className="items-center gap-2 text-base">
                            Onboard
                            <Plus className="w-4 h-4" />
                        </Button>
                    </OnboardPatient>
                </AdminHeading>

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
                <AdminPatientTable data={data} loading={loading} />
                <PaginationComponent page={1} setPage={setPage} currentPage={data?.page || 1} isNext={data?.hasNextPage || false} isPrev={data?.hasPrevPage || false} totalPages={data?.totalPages || 1} key={page} />
            </div>
        </AdminLayout>
    )
}