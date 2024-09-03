import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Fragment, useState } from "react"
import { parseISO, format } from 'date-fns';
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/global/user-avatar";
import { DeleteDialog } from "@/components/global/delete-dialog";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { patient_api } from "@/lib/api";
import { patient_list } from "@/slice/admin/patient_slice";

interface props {
    data: any,
    loading: boolean
}

export const AdminPatientTable = ({ data, loading }: props) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const onDelete = async (data: any) => {
        const res = await patient_api.delete(data)
        // console.log(res)
        if (res.success) {
            toast.success(res?.message)
            dispatch(patient_list()).unwrap();
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
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Name</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Phone</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Email</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Gender</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Age</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Date of birth</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Address</TableHead>
                        <TableHead className="text-base text-center text-white rounded min-w-fit whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium border-0 text-neutral-500">
                    {data?.docs?.map((doc: any, index: number) => {
                        const date = doc?.dateOfBirth ? parseISO(doc?.dateOfBirth) : '';
                        const formattedDate = date ? format(date, 'MMMM do, yyyy') : ''
                        return (
                            <TableRow className="h-12 px-4 bg-neutral-100" key={index}>
                                <TableCell className="flex items-center gap-3 overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">
                                    <UserAvatar placeholder={doc?.name} imageUrl={doc?.profile_image} size='sm' />
                                    <span>{doc?.name}</span>
                                </TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.phone}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.email}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center capitalize rounded min-w-fit whitespace-nowrap">{doc?.gender}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{doc?.age}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{formattedDate}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-[250px] max-w-[200px]">{doc?.address}</TableCell>
                              
                             
                                <TableCell className="text-sm font-medium text-center rounded min-w-fit">
                                    <div className="flex items-center justify-center gap-1">
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
            <DeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} onDelete={onDelete} deleteText="Patient" data={deleteId} />
        </Fragment>
    )
}