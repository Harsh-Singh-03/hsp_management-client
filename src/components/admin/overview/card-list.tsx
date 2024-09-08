import { DashboardCardSkeleton, StatsCard } from "@/components/global/stats-card"
import { RootState } from "@/store";
import { BarChart3 } from "lucide-react"
import { useSelector } from "react-redux";

export const CardList = () => {
    const { data, loading } = useSelector((state: RootState) => state.admin_overview_count);

    if( loading ){
        return (
            <div className="flex w-full gap-4 lg:gap-6 overflow-x-scroll max-w-[100%] h-auto custom-scrollbar pr-4">
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
            </div>
        )
    }

    return (
        <div className="flex w-full gap-4 lg:gap-6 overflow-x-scroll max-w-[100%] h-auto custom-scrollbar px-6">
            <StatsCard style="primary" Icon={BarChart3} title="Today Appointments" value={data?.today_appointments} />
            <StatsCard style="secondary" Icon={BarChart3} title="Total Appointments" value={data?.total_appointments} />
            <StatsCard style="third" Icon={BarChart3} title="Completed Appointments" value={data?.total_complete_appointments} />
            <StatsCard style="fourth" Icon={BarChart3} title="Active Doctors" value={data?.total_active_doctors} />
        </div>
    )
}