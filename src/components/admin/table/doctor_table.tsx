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
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/global/user-avatar";
import { EditDoctor } from "../dialog/edit_doctor";
import { DeleteDialog } from "@/components/global/delete-dialog";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { doctors_api } from "@/lib/api";
import { doctor_list } from "@/slice/admin/doctor_slice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface props {
    data: any,
    loading: boolean
}

export const AdminDoctorTable = ({ data, loading }: props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [initialData, setInitialData] = useState<any>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const onDelete = async (data: any) => {
        const res = await doctors_api.delete(data)
        console.log(res)
        if (res.success) {
            dispatch(doctor_list()).unwrap();
        } else {
            toast.error(res.message)
        }
    }

    const onStatusUpdate = async (data: any, id: string) => {
        const res = await doctors_api.update(data, id)
        console.log(res)
        if (res.success) {
            toast.success(res?.message)
            dispatch(doctor_list()).unwrap();
        } else {
            toast.error(res.message)
        }
    }

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
                        <TableHead className="text-base text-center text-white rounded">Name</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Phone</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Email</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Specialization</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Experience</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Status</TableHead>
                        {/* <TableHead className="text-base text-center text-white rounded">Rating</TableHead> */}
                        <TableHead className="text-base text-center text-white rounded">Work status</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium border-0 text-neutral-500">
                    {data?.docs?.map((doc: any, index: number) => {
                        // const date = parseISO(doc?.createdAt);
                        // const formattedDate = format(date, 'MMMM do, yyyy');
                        return (
                            <TableRow className="h-12 px-4 bg-neutral-100" key={index}>
                                <TableCell className="flex items-center gap-3 overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                    <UserAvatar placeholder={doc?.name} imageUrl={doc?.profile_image} size='sm' />
                                    <span>{doc?.name}</span>
                                </TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.phone}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.email}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.specialization?.title}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.experience} yr</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center capitalize rounded min-w-fit whitespace-nowrap" >
                                    <Popover>
                                        <PopoverTrigger>
                                            <Badge
                                                className="capitalize"
                                                variant={doc?.status === 'approved' ? 'success' : doc?.status === 'rejected' ? 'destructive' : 'info'}>
                                                {doc?.status}
                                            </Badge>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-48 p-2">
                                            <Button
                                                onClick={() => onStatusUpdate({ status: 'approved' }, doc._id)}
                                                variant='ghost'
                                                className="justify-start flex-1 hover:bg-green-300/20"
                                                disabled={doc.status === 'approved'}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => onStatusUpdate({ status: 'rejected' }, doc._id)}
                                                variant='ghost'
                                                disabled={doc.status === 'rejected'}
                                                className="justify-start flex-1 hover:bg-red-300/20"
                                            >
                                                Reject
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                {/* <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap"></TableCell> */}
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Badge variant={doc?.work_status === 'available' ? 'success' : 'warning'} className="capitalize">
                                                {doc?.work_status?.replace('_', " ")}
                                            </Badge>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-48 p-2">
                                            <Button
                                                onClick={() => onStatusUpdate({ work_status: 'available' }, doc._id)}
                                                variant='ghost'
                                                className="justify-start flex-1 hover:bg-green-300/20"
                                                disabled={doc.work_status === 'available'}
                                            >
                                                Available
                                            </Button>
                                            <Button
                                                onClick={() => onStatusUpdate({ work_status: 'not_available' }, doc._id)}
                                                variant='ghost'
                                                disabled={doc.work_status === 'not_available'}
                                                className="justify-start flex-1 hover:bg-red-300/20"
                                            >
                                                Not available
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell className="text-sm font-medium text-center rounded min-w-fit">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button variant='ghost' size='icon' className="transition-all hover:bg-sky-800/80 text-sky-800 hover:text-white" onClick={() => { setDialogOpen(true); setInitialData(doc); }} >
                                            <Edit className="w-5 h-5" />
                                        </Button>
                                        <Button variant='ghost' size='icon' className="transition-all hover:bg-red-500/80 text-rose-400 hover:text-white" onClick={() => { setDeleteId(doc._id); setDeleteDialogOpen(true); }}>
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <EditDoctor open={dialogOpen} setOpen={setDialogOpen} initialData={initialData} />
            <DeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} onDelete={onDelete} deleteText="Doctor" data={deleteId} />
        </Fragment>
    )
}