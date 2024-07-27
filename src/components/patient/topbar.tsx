import { BellDot, Mail, SearchIcon } from "lucide-react"
import { Search } from "../global/search"
import { UserAvatar } from "../global/user-avatar"

export const TopBar = () => {
    return (
        <header className="sticky top-0 left-0 z-20 flex items-center justify-between w-screen h-16 pr-6 bg-white border-b">
            <div className="relative flex items-center ml-6">
                <div className="flex items-center gap-1 px-4 py-2 mr-10">
                    <img src="/logo.png" alt="logo" className="object-contain w-10 h-10" />
                    <h4 className="text-xl font-semibold tracking-wide text-neutral-700">Hospitality</h4>
                </div>
                <Search />
                <button className="absolute z-40 cursor-pointer right-4 text-neutral-400 hover:text-neutral-600">
                    <SearchIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex items-center gap-4">
                <button className="icon-btn">
                    <Mail className="w-4 h-4" />
                </button>
                <button className="icon-btn">
                    <BellDot className="w-4 h-4" />
                </button>
                <button className="icon-btn">
                    <UserAvatar placeholder="Harsh" imageUrl="#" size="sm" />
                </button>
            </div>
        </header>
    )
}