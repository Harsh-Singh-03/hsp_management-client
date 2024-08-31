import { AdminLayout } from "@/components/admin"
import { Chart1 } from "@/components/admin/overview/Chart1"
import { Chart2 } from "@/components/admin/overview/Chart2"
import { Chart3 } from "@/components/admin/overview/Chart3"
import { CardList } from "@/components/admin/overview/card-list"
import { DoctorTable } from "@/components/admin/table/doctor-table"
import { overview_count } from "@/slice/admin/admin_overview_slice"
import { AppDispatch, RootState } from "@/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


export const AdminOverView = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.admin_overview_count);

    useEffect(() => {
        if(!data){
            dispatch(overview_count());
        }
    }, [dispatch, data]);
    
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <CardList />
                <div className="flex w-full gap-6 px-6">
                    <Chart1 />
                    <Chart2 />
                </div>
                <div className="flex w-full gap-6 px-6">
                    <DoctorTable />
                    <Chart3 />
                </div>
            </div>
        </AdminLayout>
    )
}