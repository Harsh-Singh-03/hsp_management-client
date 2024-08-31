import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Fragment, useState } from "react"
// import { parseISO, format } from 'date-fns';
import { Edit, Loader2, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/global/user-avatar";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { appointment_api } from "@/lib/api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { UpdateAppointment } from "../dialog/update-appointment";
import { appointment_list } from "@/slice/admin/appointment_slice";
import AppointmentDetailsModal from "@/components/global/appointment_details";

interface props {
    data: any,
    loading: boolean
}

export const AppointmentTable = ({ data, loading }: props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogOpen1, setDialogOpen1] = useState(false)
    const [initialData, setInitialData] = useState<any>(null)
    const dispatch = useDispatch<AppDispatch>()

    const onStatusUpdate = async (data: any, id: string) => {
        const res = await appointment_api.update(id, data)
        console.log(res)
        if (res.success) {
            toast.success(res?.message)
            dispatch(appointment_list()).unwrap();
        } else {
            toast.error(res.message)
        }
    }

    const statusArr = [{ label: "Admitted", value: "admitted" }, { label: "Completed", value: "completed" }, { label: "Cancelled", value: "cancelled" }]

    if (loading) {
        return (
            <div className="grid my-32 place-items-center">
                <Loader2 className="animate-spin text-neutral-400 w-14 h-14" />
            </div>
        )
    }


    return (
        <Fragment>
            <Table className="overflow-x-auto -translate-y-2 border-separate border-spacing-2">
                <TableHeader>
                    <TableRow className="h-12 px-4 bg-sky-800 hover:bg-sky-800">
                        <TableHead className="text-base text-center text-white rounded">Ref</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Patient</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Doctor</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Reason</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Department</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Status</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Appointment At</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium border-0 text-neutral-500">
                    {data?.docs?.map((doc: any, index: number) => {
                        const date = doc?.from ? parseISO(doc?.from) : ''
                        const formattedDate = doc?.from ? format(date, 'do MMMM, yyyy hh:mm') : ''
                        return (
                            <TableRow className="h-12 px-4 bg-neutral-100" key={index}>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.ref}</TableCell>

                                <TableCell
                                    className="flex items-center gap-3 overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap"
                                >
                                    {doc?.patient && (
                                        <UserAvatar placeholder={doc?.patient?.name} imageUrl={doc?.patient?.profile_image} size='sm' />
                                    )}
                                    <span>{doc?.patient?.name}</span>
                                </TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {doc?.doctor && (
                                            <UserAvatar placeholder={doc?.doctor?.name} imageUrl={doc?.doctor?.profile_image} size='sm' />
                                        )}
                                        {doc?.doctor?.name}

                                    </div>
                                </TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.reason}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.department}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center capitalize rounded min-w-fit whitespace-nowrap" >
                                    <Popover>
                                        <PopoverTrigger>
                                            <Badge
                                                className="capitalize"
                                                variant={
                                                    doc?.status === 'requested' ? 'pending' : doc?.status === 'cancelled' ? 'destructive' : doc?.status === 'completed' ? 'success' : doc?.status === 'admitted' ? 'warning' : 'info'
                                                }>
                                                {doc?.status}
                                            </Badge>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-48 p-2">
                                            {statusArr.map((it, i) => (
                                                <Button
                                                    onClick={() => onStatusUpdate({ status: it.value }, doc._id)}
                                                    variant='ghost'
                                                    className="justify-start flex-1"
                                                    disabled={doc.status === it.value}
                                                    key={i}
                                                >
                                                    {it.label}
                                                </Button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                    {formattedDate}
                                </TableCell>

                                <TableCell className="text-sm font-medium text-center rounded min-w-fit">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button variant='ghost' size='icon' className="transition-all hover:bg-sky-800/80 text-sky-800 hover:text-white" onClick={() => { setDialogOpen(true); setInitialData(doc); }} >
                                            <Edit className="w-5 h-5" />
                                        </Button>
                                        <Button variant='ghost' size='icon' onClick={() => { setDialogOpen1(true); setInitialData(doc); }} >
                                            <View className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <UpdateAppointment open={dialogOpen} setOpen={setDialogOpen} initialData={initialData} />
            <AppointmentDetailsModal open={dialogOpen1} setOpen={setDialogOpen1} id={initialData?._id} type="admin" />
        </Fragment>
    )
}