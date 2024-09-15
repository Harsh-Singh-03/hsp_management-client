import { useSelector } from "react-redux";
import { UserAvatar } from "../global/user-avatar"
import { RootState } from "@/store";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LogOut, ShieldQuestion, UserCog } from "lucide-react";
import { admin_credentials } from "@/lib/api";
import { UpdatePassDialog } from "../global/update_password";
import { Link } from 'react-router-dom'

export const TopBar = () => {

    const { data } = useSelector((state: RootState) => state.admin_auth);

    const signOut = async () => {
        const data = await admin_credentials.logout()
        if (data && data.success) {
            window.location.reload();
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <header className="sticky top-0 left-0 z-20 flex items-center justify-between w-screen h-16 pr-4 bg-white border-b md:pr-6 lg:pl-64">
            <Link to="/" className="flex items-center gap-1 px-4 py-2 ml-8 lg:hidden">
                <img src="/logo.png" alt="logo" className="object-contain w-10 h-10" />
                <h4 className="text-xl font-semibold tracking-wide text-neutral-700">Hospitality</h4>
            </Link>
            <div className="relative flex items-center ml-6">
                {/* <Search />
                <button className="absolute z-40 cursor-pointer right-4 text-neutral-400 hover:text-neutral-600">
                    <SearchIcon className="w-4 h-4" />
                </button> */}
            </div>
            <div className="flex items-center gap-4">
                {/* <button className="icon-btn">
                    <Mail className="w-4 h-4" />
                </button>
                <button className="icon-btn">
                    <BellDot className="w-4 h-4" />
                </button> */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="icon-btn">
                            <UserAvatar placeholder={data?.name} imageUrl={data?.profile_image || '#'} size="sm" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="pb-2 mr-4">
                        <div className="w-full">
                            <div className="flex items-center gap-4 px-2">
                                <UserAvatar
                                    placeholder={data?.name}
                                    imageUrl={data?.profile_image || ''}
                                    size='md'
                                />
                                <div>
                                    <p className="text-base font-medium">{data?.name}</p>
                                    <p className="text-xs text-muted-foreground">@{data?.email}</p>
                                </div>
                            </div>
                            <Separator className="mt-3" />
                            <div className="w-full my-2">
                                {/* <Button variant='ghost' className="flex justify-start w-full gap-x-3 text-muted-foreground">
                                    <UserCog className="w-4 h-4" />
                                    <span>Manage Profile</span>
                                </Button> */}
                                <UpdatePassDialog page="admin">
                                    <Button variant='ghost' className="justify-start w-full gap-x-3 text-muted-foreground">
                                        <ShieldQuestion className="w-4 h-4" />
                                        <span>Reset password</span>
                                    </Button>
                                </UpdatePassDialog>
                                <Separator className="w-full my-2" />
                                <Button variant='ghost' className="justify-start w-full gap-x-3 text-muted-foreground" onClick={() => signOut()}>
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    )
}