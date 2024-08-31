import { AdminLayout } from "@/components/admin";
import { CreateDepartment } from "@/components/admin/dialog/create-department";
import { DepartmentTable } from "@/components/admin/table/department-table";
import { AdminHeading } from "@/components/global/admin-heading";
// import { DatePickerWithRange } from "@/components/global/date-range";
import { SearchComponent } from "@/components/global/search copy";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dep_list } from "@/slice/admin/department_slice";
import { AppDispatch, RootState } from "@/store";
// import { addDays } from "date-fns";
import {  Hospital, Plus } from "lucide-react";
import { useEffect } from "react";
// import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Department = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.department);
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('search') || ""

    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: addDays(new Date(), -30),
    //     to: new Date(),
    // })

    useEffect(() => {
        if(!data || data?.length === 0 || searchTerm || searchTerm === ''){
            const body = {
                search: searchTerm,
            }
            dispatch(dep_list(body))
        }

    }, [dispatch, searchTerm]);

    return (
        <AdminLayout>
            <div className="flex flex-col flex-1 min-h-screen gap-6 p-6 mx-6 bg-white rounded-lg">

                <AdminHeading title="Department" Icon={Hospital} IconClass="text-sky-800 stroke-[2px]">
                    <CreateDepartment>
                        <Button variant='primary' size='default' className="items-center gap-2 text-base">
                            Create
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CreateDepartment>
                </AdminHeading>

                {/* <div className="flex w-full gap-6">
                    <StatsCard style="primary" Icon={BarChart3} title="New Label" value="100"  />
                    <StatsCard style="secondary" Icon={BarChart3} title="New Label" value="100"  />
                    <StatsCard style="third" Icon={BarChart3} title="New Label" value="100"  />
                    <StatsCard style="fourth" Icon={BarChart3} title="New Label" value="100"  />
                </div> */}

                <Separator className="h-[0.5px] bg-neutral-200" />

                <div className="flex flex-wrap justify-between gap-4">
                    <SearchComponent />
                </div>
                <DepartmentTable data={data} loading={loading} />
            </div>
        </AdminLayout>
    )
}