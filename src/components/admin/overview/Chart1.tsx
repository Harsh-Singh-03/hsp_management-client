import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Chart1 = () => {
    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 6400,
            amt: 2400,
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 7398,
            amt: 2210,
        },
        {
            name: 'Mar',
            uv: 1000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            uv: 8780,
            pv: 10908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 9890,
            pv: 15800,
            amt: 2181,
        },
        {
            name: 'Jun',
            uv: 2390,
            pv: 6800,
            amt: 2500,
        },
        {
            name: 'Jul',
            uv: 8490,
            pv: 12300,
            amt: 2100,
        },
        {
            name: 'Aug',
            uv: 7490,
            pv: 12300,
            amt: 2100,
        },
        {
            name: 'Sep',
            uv: 3490,
            pv: 12300,
            amt: 2100,
        },
        {
            name: 'Oct',
            uv: 6490,
            pv: 10300,
            amt: 2100,
        },
        {
            name: 'Nov',
            uv: 6490,
            pv: 10300,
            amt: 2100,
        },
        {
            name: 'Dec',
            uv: 5490,
            pv: 8300,
            amt: 2100,
        },
    ];

    return (
        <div className='hidden lg:block w-[60%] max-h-[430px] bg-white rounded-xl min-w-[400px]'>
            <div className='flex items-center justify-between p-4'>
                <h4 className='text-base font-semibold text-neutral-700'>Patient Overview</h4>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-sky-600'></span>
                        <span className='text-xs font-medium text-neutral-500'>Recovered</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-sky-300'></span>
                        <span className='text-xs font-medium text-neutral-500'>Admitted</span>
                    </div>
                    <Select defaultValue='apple'>
                        <SelectTrigger className="w-[120px] rounded-full py-1">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent className='shadow-none'>
                            <SelectGroup>
                                <SelectLabel>Filter</SelectLabel>
                                <SelectItem value="apple">Monthly</SelectItem>
                                <SelectItem value="banana">Last month</SelectItem>
                                <SelectItem value="blueberry">Last 3 month</SelectItem>
                                <SelectItem value="grapes">Last 6 month</SelectItem>
                                <SelectItem value="pineapple">View all</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%" className='py-4 pr-4'>
                <BarChart
                    data={data}
                    barSize={20}
                >
                    <XAxis dataKey="name" className='text-xs truncate text-neutral-500' />
                    <YAxis />
                    <Tooltip  />
                    <Bar dataKey="pv" className='fill-sky-800' radius={[999, 999, 0, 0]} />
                    <Bar dataKey="uv" fill='#0284c7' radius={[999, 999, 0, 0]}  />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}