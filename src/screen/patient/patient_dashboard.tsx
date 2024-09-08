import { AdminHeading } from "@/components/global/admin-heading"
import { PaginationComponent } from "@/components/global/pagination"
import { SearchComponent } from "@/components/global/search copy"
import { StatsCard } from "@/components/global/stats-card"
import { PatientLayout } from "@/components/patient"
import { AppointmentPatientDialog } from "@/components/patient/appointment_dialog"
import { PatientAppointmentTable } from "@/components/patient/appointment_table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { patient_api } from "@/lib/api"
import { patient_analytics } from "@/slice/patient/analytics_slice"
import { patient_appointment_list } from "@/slice/patient/appointment_slice"
// import { validate_patient } from "@/slice/patient/credential_slice"
import { AppDispatch, RootState } from "@/store"
import { format } from "date-fns"
import { CalendarCheck, CalendarClock, LayoutDashboard, Plus, RectangleEllipsis, Stethoscope, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export const PatientDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.patient_appointment);
    const patient_stats = useSelector((state: RootState) => state.patient_analytics);
    const patient = useSelector((state: RootState) => state.patient_auth);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""
    const [isVerifing, setIsVerifing] = useState(false)
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
            dispatch(patient_analytics())
        }

    }, [dispatch, pageSize, searchTerm, page, patient.data]);

    const onVerify = async () => {
        setIsVerifing(true)
        const data = await patient_api.verify_email_req({})
        if(data.success) {
            setIsVerifing(false)
            toast.success(data.message)
            // dispatch(validate_patient())
        }else{
            toast.error(data.message)
        }
    }

    return (
        <PatientLayout>
            {patient.data?.isEmailVerified !== true && (
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
                <AdminHeading title="Patient Dashboard" Icon={LayoutDashboard} IconClass="text-sky-800 stroke-[2px]">
                    <AppointmentPatientDialog>
                        <Button variant='primary' size='default' className="items-center gap-2 text-base">
                            Request new booking
                            <Plus className="w-4 h-4" />
                        </Button>
                    </AppointmentPatientDialog>
                </AdminHeading>

                <div className="flex w-full gap-4 lg:gap-6 overflow-x-scroll max-w-[100%] h-auto pr-4 custom-scrollbar">
                    <StatsCard style="primary" Icon={CalendarCheck} title="Total Appointments" value={patient_stats.data?.total_appointments} />
                    <StatsCard style="secondary" Icon={RectangleEllipsis} title="Upcoming Appointments" value={patient_stats.data?.upcoming_appointments} />
                    <StatsCard style="third" Icon={CalendarClock} title="Last Appointment" value={patient_stats?.data?.last_appointment_date && format(patient_stats?.data?.last_appointment_date, 'do MMMM, yyyy')} />
                    <StatsCard style="fourth" Icon={Stethoscope} title="Current consultant" value={patient_stats.data?.consultant?.doctor_name} />
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