import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const SearchComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get("search")
    const [search, setSearch] = useState<string | null>(searchTerm || null)


    useEffect(() => {
        if (search !== null) {
            const timeout = setTimeout(() => {
                navigate(`${location.pathname}?search=${search}`)
            }, 500)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [search])

    const onClear = () => {
        if (search) {
            setSearch('')
            navigate(`${location.pathname}`)
        }
    }

    return (
        <div className="relative flex items-center">
            <Input type="text" className="border-0 rounded bg-neutral-100 w-80 placeholder:text-neutral-400" placeholder="Search..." value={search || ''} onChange={(e) => setSearch(e.target?.value || '')} />
            <button className="absolute cursor-pointer right-4 text-neutral-400 hover:text-neutral-600" onClick={onClear}>
                {search ? (
                    <X className="w-4 h-4" />
                ) : (
                    <SearchIcon className="w-4 h-4" />
                )}
            </button>
        </div>
    )
}