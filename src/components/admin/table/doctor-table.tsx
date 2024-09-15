import { UserAvatar } from "@/components/global/user-avatar"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { admin_dashboard } from "@/lib/api"
import { Loader2, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



export const DoctorTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await admin_dashboard.top_doctor()
            setLoading(false)
            if (response.success) {
                setData(response.data)
            } else {
                console.error(response.message)
            }

        }
        fetchData()
    }, [])
    return (
        <div className="w-full lg:w-[50%] p-4 bg-white rounded-xl">
            <div className='flex items-center justify-between'>
                <h4 className='text-base font-semibold text-neutral-700'>Top Doctors</h4>
                <Button size='sm' variant='outline' className='rounded-full' asChild>
                    <Link to='/admin/doctors'>
                        View all
                    </Link>
                </Button>
            </div>
            <Table className="mt-4">
                <TableCaption>A list of your trending doctors</TableCaption>
                {!loading && data.length > 0 && (
                    <TableBody className="font-medium text-neutral-500">
                        {data?.map((doctor: any, index: number) =>(
                            <TableRow key={index}>
                                <TableCell className="font-medium whitespace-nowrap">#{index + 1}</TableCell>
                                <TableCell className="flex items-center gap-2 whitespace-nowrap">
                                    <UserAvatar placeholder={doctor?.name} size='default' imageUrl={doctor?.profile_image || ''} />
                                    <span className="truncate">Dr. {doctor?.name?.split(" ")[0]}</span>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{doctor?.specialization}</TableCell>
                                <TableCell className="whitespace-nowrap">{doctor?.total_rating} reviews</TableCell>
                                <TableCell className="flex items-center gap-1 whitespace-nowrap">
                                    <p className="m-0">{doctor?.avg_rating}</p> <Star className="w-4 h-4 text-yellow-400 stroke-[3px]" />
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                )}
            </Table>
            {loading && (
                <div className="flex justify-center w-full my-8">
                    <Loader2 className="w-12 h-12 animate-spin text-neutral-600" />
                </div>
            )}

        </div>
    )
}