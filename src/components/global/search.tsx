import { Input } from "@/components/ui/input"

export const Search = () => {
    return (
        <form>
            <Input className="border-0 rounded-full bg-neutral-100 w-80 placeholder:text-neutral-400" placeholder="Search anything.." />
        </form>
    )
}