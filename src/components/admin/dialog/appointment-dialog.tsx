import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Fragment, useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { CreatePatientFrom } from "../form/create-patient"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { patient_api } from "@/lib/api"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/components/global/user-avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { AppointmentForm } from "../form/appointment-form"

export const AppointmentDialog = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(1)
    const [isPatientForm, setIsPatientForm] = useState(false)
    const [patientDetails, setPatientDetails] = useState<any>('')
    const [search, setSearch] = useState('')
    const [patient_list, setPatientList] = useState<any[]>([])

    const fetchPatient = async () => {
        const data = await patient_api.list({ search: search || '' })
        if (data.success) {
            setPatientList(data?.data?.docs)
        } else {
            setPatientList([])
            toast.info(data.message)
        }
    }

    useEffect(() => {
        if (search !== null) {
            const timeout = setTimeout(() => {
                fetchPatient()
            }, 600)

            return () => clearTimeout(timeout)
        }
    }, [search])

    const selectPatient = (e: any, data: any) => {
        console.log(e)
        if (e) {
            setPatientDetails(data)
            setStep(2)
        }
    }

    return (
        <Dialog onOpenChange={() => setStep(1)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-screen-sm p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold tracking-wide text-center">Create new appointment</DialogTitle>
                    <DialogDescription className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam autem similique qui minus suscipit?</DialogDescription>
                </DialogHeader>
                <div className="px-4">
                    <Progress value={step * 33} />
                </div>
                {step === 1 && (
                    <div className="">
                        {!isPatientForm && (
                            <div className="justify-end flex-1 p-4">
                                <Input className="w-full border-0 rounded-md bg-neutral-100 placeholder:text-neutral-400" placeholder="Search by name email phone.." onChange={(e) => setSearch(e.target.value)} />
                                <ScrollArea className="h-[50vh]">
                                    <div className="p-4 mt-2 space-y-4 rounded-md bg-neutral-100">
                                        <Label className="text-base">Select Patients</Label>
                                        {patient_list.length > 0 ? patient_list.map((patient, i) => (
                                            <Fragment key={i}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                                        <UserAvatar placeholder={patient?.name} imageUrl={patient?.profile_image} size='sm' />
                                                        <span>{patient?.name}</span>
                                                    </div>
                                                    <Checkbox onCheckedChange={(e) => selectPatient(e, patient)} />
                                                </div>
                                                <Separator className="bg-white" />
                                            </Fragment>
                                        )) : (
                                            <p className="text-center text-neutral-700">No patients found</p>
                                        )}
                                    </div>
                                </ScrollArea>
                                <div className="flex justify-end" >
                                    <Button onClick={() => { setPatientDetails(null); setIsPatientForm(true); }}>Register new patient</Button>

                                </div>
                            </div>
                        )}
                        {isPatientForm && (
                            <CreatePatientFrom isApp={true} onData={setPatientDetails} onBack={setIsPatientForm} />
                        )}
                    </div>
                )}
                {step === 2 && (
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden text-sm font-medium rounded min-w-fit whitespace-nowrap">
                                <UserAvatar placeholder={patientDetails?.name} imageUrl={patientDetails?.profile_image} size='default' />
                                <div>
                                    <span className="text-base">{patientDetails?.name}</span>
                                    <p className="text-xs font-normal">{patientDetails?.phone}</p>
                                </div>
                            </div>
                        </div>
                        <AppointmentForm patient={patientDetails} onBack={setStep} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}