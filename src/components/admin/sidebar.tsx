import { cn } from "@/lib/utils"
import { LogOutIcon, Menu } from "lucide-react"
import { admin_sidebar } from "@/constant/admin"
import { Link, useLocation } from "react-router-dom"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { newActiveIndex } from "@/slice/admin/basic_slice"
import { admin_credentials } from "@/lib/api"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useEffect } from "react"
export const SideBar = () => {
    const { value } = useSelector((state: RootState) => state.activeIndex);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation()

    useEffect(() => {
        admin_sidebar.forEach((item, i) => {
            if(item.url === location.pathname){
                dispatch(newActiveIndex(i))
            }
        })
    }, [])

    const signOut = async () => {
        const data = await admin_credentials.logout()
        if (data && data.success) {
            window.location.reload();
        }
    }

    const SideMenu = ({ hide }: { hide?: boolean }) => {
        return (
            <aside className="flex flex-col w-full h-full overflow-hidden bg-white min-h-svh rounded-t-xl rounded-r-xl">
                <Link to='/' className={cn(
                    "flex items-center gap-1 px-4 py-2",
                    hide && 'hidden'
                )}>
                    <img src="/logo.png" alt="logo" className="object-contain w-10 h-10" />
                    <h4 className="text-xl font-semibold tracking-wide text-neutral-700">Hospitality</h4>
                </Link>
                <ul className="flex flex-col gap-3 pb-10 mt-9">
                    {admin_sidebar.map((item, index) => {
                        return (
                            <li className={cn(
                                "w-full px-4",
                                index === value && "relative before:absolute before:w-3 before:h-3 before:bg-sky-800 before:-right-1.5 before:top-1/2 before:rounded-full before:-translate-y-1/2"
                            )}
                                key={index}
                            >
                                <Link to={item.url} onClick={() => dispatch(newActiveIndex(index))} className={cn(
                                    "flex items-center w-full gap-3 px-4 py-2.5 text-base font-medium text-neutral-600 transition-all duration-500",
                                    value === index ? "text-white bg-sky-800 rounded-r-full rounded-l-lg" : "rounded-full hover:bg-neutral-200/20"
                                )}>
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.title}</span>
                                </Link>
                            </li>

                        )
                    })}
                    <Separator />
                    {/* <li className="w-full px-4">
                    <a href="#" className={cn(
                        "flex items-center w-full gap-3 px-4 py-2.5 text-base font-medium rounded-full text-neutral-600 transition-all",
                    )}>
                        <Settings2 className="w-5 h-5" />
                        <span>Settings</span>
                    </a>
                </li> */}
                    <li className="w-full px-4">
                        <button
                            className={cn(
                                "flex items-center w-full gap-3 px-4 py-2.5 text-base font-medium rounded-full text-neutral-600 transition-all",
                            )}
                            onClick={signOut}

                        >
                            <LogOutIcon className="w-5 h-5" />
                            <span>Sign out</span>
                        </button>
                    </li>
                </ul>
                <div></div>
            </aside>
        )
    }

    return (
        <>
            <div className="block lg:hidden">
                <Sheet >
                    <SheetTrigger asChild>
                        <button className="fixed top-4 left-4 z-[50]">
                            <Menu />
                        </button>
                    </SheetTrigger>
                    <SheetContent className="p-0" side={'left'}>
                        <SideMenu hide={true} />
                    </SheetContent>
                </Sheet>
            </div>

            <ScrollArea className="fixed top-0 left-0 z-40 hidden w-64 h-svh lg:block" style={{ position: 'fixed' }}>
                <SideMenu />
            </ScrollArea>
        </>
    )
}