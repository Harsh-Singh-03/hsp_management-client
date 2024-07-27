import { AdminLayout } from "@/components/admin"
import { Chart1 } from "@/components/admin/overview/Chart1"
import { Chart2 } from "@/components/admin/overview/Chart2"
import { Chart3 } from "@/components/admin/overview/Chart3"
import { CardList } from "@/components/admin/overview/card-list"
import { DoctorTable } from "@/components/admin/table/doctor-table"


export const AdminOverView = () => {
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