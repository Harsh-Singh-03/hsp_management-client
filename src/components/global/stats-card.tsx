import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton";

interface props {
    style: 'primary' | 'secondary' | 'third' | 'fourth'
    Icon: React.ElementType,
    title: string,
    value: string | number,
    subTitle?: string,
    progress?: number,
}
export const StatsCard = ({ style, title, Icon, value, subTitle, progress }: props) => {
    return (
        <div className={cn(
            "shadow-sm dashboard_card bg-neutral-100 border-2 transition-all",
            style === 'primary' && 'border-b-sky-600 bg-sky-600/10',
            style === 'secondary' && 'border-b-orange-600 bg-orange-600/10',
            style === 'third' && 'border-b-green-600 bg-green-600/10',
            style === 'fourth' && 'border-b-indigo-600 bg-indigo-600/10',
        )}>
            <div className="flex flex-col ">
                <h4 className={cn(
                    "text-2xl font-bold",
                    style === 'primary' && 'text-sky-600',
                    style === 'secondary' && 'text-orange-600',
                    style === 'third' && 'text-green-600',
                    style === 'fourth' && 'text-indigo-600',
                )}>{value}</h4>
                <h6 className="text-xs font-bold uppercase lg:text-sm text-neutral-600">{title || "Label"}</h6>
            </div>
            <div className={cn(
                "w-12 h-12 rounded-full bg-neutral-500/80 text-white flex justify-center items-center",
                style === 'primary' && 'bg-sky-600/80',
                style === 'secondary' && 'bg-orange-600/80',
                style === 'third' && 'bg-green-600/80',
                style === 'fourth' && 'bg-indigo-600/80',
            )}>
                <Icon width={24} height={24} />
            </div>
        </div>
    )
}

export const DashboardCardSkeleton = () => {
    return (
        <div className={cn(
            "shadow-sm dashboard_card bg-neutral-100 border-2 transition-all animate-pulse",
        )}>
            <div className="flex flex-col space-y-2">
                <Skeleton className="w-16 h-8 bg-neutral-200" />
                <Skeleton className="w-24 h-4 bg-neutral-200" />
            </div>
            <div className={cn(
                "w-12 h-12 rounded-full bg-neutral-500/20 flex justify-center items-center",
            )}>
                <Skeleton className="w-6 h-6 rounded-full bg-neutral-300" />
            </div>
        </div>
    );
};
