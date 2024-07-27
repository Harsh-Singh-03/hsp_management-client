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
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditDepartment } from "../dialog/edit-department";
import { DeleteDialog } from "@/components/global/delete-dialog";
import { department } from "@/lib/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { dep_list } from "@/slice/admin/department_slice";
import { AppDispatch } from "@/store";


interface props {
    data: any[] | null | undefined,
    loading: boolean
}
export const DepartmentTable = ({ data, loading }: props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const [editData, setEditData] = useState({
        id: '',
        title: '',
        description: ''
    })

    const onDelete = async (data: any) => {
        const res = await department.delete(data)
        if (res.success) {
            toast.warn(res.message)
            dispatch(dep_list()).unwrap();
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
                        <TableHead className="text-base text-center text-white rounded">Number</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Name</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Created At</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Head1</TableHead>
                        <TableHead className="text-base text-center text-white rounded">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium border-0 text-neutral-500">
                    {data?.map((doc, index) => {
                        const date = parseISO(doc?.createdAt);
                        const formattedDate = format(date, 'MMMM do, yyyy');
                        return (
                            <TableRow className="h-12 px-4 bg-neutral-100" key={index}>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded whitespace-nowrap">#{index}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center capitalize rounded min-w-fit whitespace-nowrap">{doc?.title}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">{formattedDate}</TableCell>
                                <TableCell className="overflow-hidden text-sm font-medium text-center rounded min-w-fit whitespace-nowrap">#1</TableCell>
                                <TableCell className="text-sm font-medium text-center rounded min-w-fit">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button variant='ghost' size='icon' className="transition-all hover:bg-sky-800/80 text-sky-800 hover:text-white" onClick={() => {
                                            setEditData({ title: doc.title, description: doc.description, id: doc._id })
                                            setDialogOpen(true);
                                        }}>
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

            <EditDepartment open={dialogOpen} setOpen={setDialogOpen} initialData={editData} />
            <DeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} onDelete={onDelete} deleteText="Department" data={deleteId} />
        </Fragment>

    )
}