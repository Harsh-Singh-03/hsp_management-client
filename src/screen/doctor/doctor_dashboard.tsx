import { DoctorLayout } from "@/components/doctor"
import { DoctorAppointmentTable } from "@/components/doctor/appointment_table"
import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { StatsCard } from "@/components/global/stats-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { doctors_api } from "@/lib/api"
import { doctor_analytics } from "@/slice/doctor/analytics_slice"
import { doctor_appointment_list } from "@/slice/doctor/appointment_slice"
import { AppDispatch, RootState } from "@/store"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { CalendarClock, ClipboardCheck, LayoutDashboard, RectangleEllipsis, SquareActivity, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

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
    const [isVerifing, setIsVerifing] = useState(false)

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

    const onVerify = async () => {
        setIsVerifing(true)
        const data = await doctors_api.verify_email_req({})
        if(data.success) {
            setIsVerifing(false)
            toast.success(data.message)
            // dispatch(validate_patient())
        }else{
            toast.error(data.message)
        }
    }

    return (
        <DoctorLayout>
             {doctor.data?.isEmailVerified !== true && (
                <Alert className="mb-4" variant='destructive'>
                    <Terminal className="w-4 h-4" />
                    <AlertTitle>Email Verification!</AlertTitle>
                    <AlertDescription className="flex items-center justify-between">
                        Please verify your email address to continue booking appointments.
                        <Button size='sm' className="ml-2" disabled={isVerifing} onClick={onVerify}>
                            Verify Email
                        </Button>
                    </AlertDescription>
                </Alert>
            )}
            <div className="space-y-4 lg:space-y-6">
                <AdminHeading title={`Welcome, ${doctor?.data?.name?.split(' ')[0]}`} Icon={LayoutDashboard} IconClass="text-sky-800 stroke-[2px]">
                    <Button variant='primary' size='default' asChild>
                        <Link to='/doctor/reviews'>Reviews</Link>
                    </Button>
                </AdminHeading>
                {doctor?.data?.total_rating > 0 && (
                    <div className="flex items-center gap-2 text-base text-gray-500">
                        <h4 className="text-lg font-semibold text-black">Your Rating : </h4>
                        {doctor?.data?.avg_rating} 
                        <StarFilledIcon className="text-yellow-400" /> 
                        <span>Rated by {doctor?.data?.total_rating} {doctor?.data?.total_rating > 1 ? 'Patients' : 'Patient'}</span>
                    </div>
                )}

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