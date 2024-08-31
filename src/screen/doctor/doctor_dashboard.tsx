import { DoctorLayout } from "@/components/doctor"
import { DoctorAppointmentTable } from "@/components/doctor/appointment_table"
import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { StatsCard } from "@/components/global/stats-card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { doctor_analytics } from "@/slice/doctor/analytics_slice"
import { doctor_appointment_list } from "@/slice/doctor/appointment_slice"
import { AppDispatch, RootState } from "@/store"
import { CalendarClock, ClipboardCheck, LayoutDashboard, RectangleEllipsis, SquareActivity } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export const DoctorDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.doctor_appointment);
    const doctor_stats = useSelector((state: RootState) => state.doctor_analytics);
    const doctor = useSelector((state: RootState) => state.doctor_auth);
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
                doctor_id: doctor.data._id,
                page
            }
            dispatch(doctor_appointment_list(body)).unwrap();
        };

        if (doctor.data && doctor.data?._id) {
            fetchData()
            dispatch(doctor_analytics())
        }

    }, [dispatch, pageSize, searchTerm, page, doctor.data]);

    return (
        <DoctorLayout>
            <div className="space-y-4 lg:space-y-6">
                <AdminHeading title="Doctor Panel" Icon={LayoutDashboard} IconClass="text-sky-800 stroke-[2px]">
                    <></>
                </AdminHeading>

                <div className="flex w-full gap-4 lg:gap-6 overflow-x-scroll max-w-[100%] h-auto pr-4">
                    <StatsCard style="primary" Icon={CalendarClock} title="Total Appointments" value={doctor_stats.data?.total_appointments} />
                    <StatsCard style="secondary" Icon={RectangleEllipsis} title="Pending Appointments" value={doctor_stats.data?.pending_appointments} />
                    <StatsCard style="third" Icon={ClipboardCheck} title="Completed Appointments" value={doctor_stats?.data?.completetd_appointments} />
                    <StatsCard style="fourth" Icon={SquareActivity} title="Total Patients" value={doctor_stats.data?.total_patient} />
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
                <DoctorAppointmentTable data={data} loading={loading} />
                <PaginationComponent page={1} setPage={setPage} currentPage={data?.page || 1} isNext={data?.hasNextPage || false} isPrev={data?.hasPrevPage || false} totalPages={data?.totalPages || 1} key={page} />
            </div>
        </DoctorLayout>
    )
}