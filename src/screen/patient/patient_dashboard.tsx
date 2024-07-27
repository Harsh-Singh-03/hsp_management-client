import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { PatientLayout } from "@/components/patient"
import { AppointmentPatientDialog } from "@/components/patient/appointment_dialog"
import { PatientAppointmentTable } from "@/components/patient/appointment_table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { patient_appointment_list } from "@/slice/patient/appointment_slice"
import { AppDispatch, RootState } from "@/store"
import { LayoutDashboard, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export const PatientDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.patient_appointment);
    const patient = useSelector((state: RootState) => state.patient_auth);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState('10')

    useEffect(() => {
        const fetchData = async () => {
            const body: any = {
                limit: Number(pageSize),
                search: searchTerm,
                patient_id: patient.data._id,
                page
            }
            dispatch(patient_appointment_list(body)).unwrap();
        };

        if (patient.data && patient.data?._id) {
            fetchData()
        }

    }, [dispatch, pageSize, searchTerm, page, patient.data]);

    return (
        <PatientLayout>
            <div className="space-y-4 lg:space-y-6">
                <AdminHeading title="Patient Dashboard" Icon={LayoutDashboard} IconClass="text-sky-800 stroke-[2px]">
                    <AppointmentPatientDialog>
                        <Button variant='primary' size='default' className="items-center gap-2 text-base">
                            Book new appointment
                            <Plus className="w-4 h-4" />
                        </Button>
                    </AppointmentPatientDialog>
                </AdminHeading>

                <div className="flex w-full gap-6">
                    <div className="shadow-sm dashboard_card bg-neutral-100">

                    </div>
                    <div className="shadow-sm dashboard_card bg-neutral-100">

                    </div>
                    <div className="shadow-sm dashboard_card bg-neutral-100">

                    </div>
                    <div className="shadow-sm dashboard_card bg-neutral-100">

                    </div>
                </div>

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
                <PatientAppointmentTable data={data} loading={loading} />
                <PaginationComponent page={1} setPage={setPage} currentPage={data?.page || 1} isNext={data?.hasNextPage || false} isPrev={data?.hasPrevPage || false} totalPages={data?.totalPages || 1} key={page} />
            </div>
        </PatientLayout>
    )
}