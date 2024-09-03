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
            <div className="flex flex-col gap-4 lg:gap-6">
                <CardList />
                <div className="flex flex-col w-full gap-4 px-4 lg:gap-6 lg:px-6 lg:flex-row">
                    <Chart1 />
                    <Chart2 />
                </div>
                <div className="flex flex-col w-full gap-4 px-4 lg:gap-6 lg:px-6 lg:flex-row">
                    <DoctorTable />
                    <Chart3 />
                </div>
            </div>
        </AdminLayout>
    )
}