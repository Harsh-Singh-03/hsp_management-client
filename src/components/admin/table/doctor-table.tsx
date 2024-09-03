import { UserAvatar } from "@/components/global/user-avatar"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Star } from "lucide-react"



export const DoctorTable = () => {
    return (
        <div className="w-full lg:w-[50%] p-4 bg-white rounded-xl">
            <div className='flex items-center justify-between'>
                <h4 className='text-base font-semibold text-neutral-700'>Top Doctors</h4>
                <Button size='sm' variant='outline' className='rounded-full'>
                    View all
                </Button>
            </div>
            <Table className="mt-4">
                <TableCaption>A list of your trending doctors</TableCaption>
                <TableBody className="font-medium text-neutral-500">
                    <TableRow>
                        <TableCell className="font-medium whitespace-nowrap">#1</TableCell>
                        <TableCell className="flex items-center gap-2 whitespace-nowrap">
                            <UserAvatar placeholder="Harsh" size='default' imageUrl="#" />
                            <span className="truncate">Dr.  Harsh</span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">Surgery</TableCell>
                        <TableCell className="whitespace-nowrap">286 reviews</TableCell>
                        <TableCell className="flex items-center gap-1 whitespace-nowrap">
                            <p className="m-0">5</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                        </TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#1</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <UserAvatar placeholder="Harsh" size='default' imageUrl="#" />
                            <span className="truncate">Dr. Harsh</span>
                        </TableCell>
                        <TableCell>Surgery</TableCell>
                        <TableCell className="">286 reviews</TableCell>
                        <TableCell className="flex items-center gap-1">
                            <p className="m-0">5</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                        </TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#1</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <UserAvatar placeholder="Harsh" size='default' imageUrl="#" />
                            <span className="truncate">Dr. Harsh</span>
                        </TableCell>
                        <TableCell>Surgery</TableCell>
                        <TableCell className="">286 reviews</TableCell>
                        <TableCell className="flex items-center gap-1">
                            <p className="m-0">5</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                        </TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#1</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <UserAvatar placeholder="Harsh" size='default' imageUrl="#" />
                            <span className="truncate">Dr. Harsh</span>
                        </TableCell>
                        <TableCell>Surgery</TableCell>
                        <TableCell className="">286 reviews</TableCell>
                        <TableCell className="flex items-center gap-1">
                            <p className="m-0">5</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                        </TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#1</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <UserAvatar placeholder="Harsh" size='default' imageUrl="#" />
                            <span className="truncate">Dr. Harsh</span>
                        </TableCell>
                        <TableCell>Surgery</TableCell>
                        <TableCell className="">286 reviews</TableCell>
                        <TableCell className="flex items-center gap-1">
                            <p className="m-0">5</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                        </TableCell> 
                    </TableRow>

                </TableBody>
            </Table>

        </div>
    )
}