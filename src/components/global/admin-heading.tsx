import { cn } from "@/lib/utils";
import { ArrowLeftToLine, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface props {
    title: string;
    Icon?: LucideIcon,
    children?: React.ReactNode,
    IconClass?: string,
    headingStyle?: string,
    isBack?: boolean
}

export const AdminHeading = ({title, Icon, children, IconClass, headingStyle, isBack}: props) => {
    const Navigate = useNavigate()
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                {isBack && (
                    <button onClick={() => Navigate(-1)}>
                        <ArrowLeftToLine />
                    </button>
                )}
                {Icon && (
                    <Icon className={cn(
                        "h-10 w-10",
                        IconClass
                    )} />
                )}
                <h2 className={cn(
                    "text-2xl font-bold tracking-wide text-neutral-800 relative before:absolute before:w-1/2 before:h-[2.5px] before:bg-sky-800 before:bottom-0 before:right-0 before:rounded",
                    headingStyle
                )}>{title}</h2>
            </div>
            {children}
        </div>
    )
}