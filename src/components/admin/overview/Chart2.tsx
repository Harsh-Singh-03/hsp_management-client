import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Chart2 = () => {
    return (
        <div className='flex flex-col flex-1 p-4 bg-white rounded-lg'>
             <div className='flex items-center justify-between'>
                <h4 className='text-base font-semibold text-neutral-700'>Department Overview</h4>
                <Button size='sm' variant='outline' className='rounded-full' asChild>
                    <Link to='/admin/department'>
                        View all
                    </Link>
                </Button>
            </div>
            <div className='grid flex-1 w-full place-items-center'>
                <PieChart className='w-full h-full' width={300} height={300}>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        label
                        dataKey="value"
                    >
                        <Tooltip />
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-4'>
                <div className='flex items-center gap-1'>
                    <span className='w-3 h-3 rounded-full bg-[#0088FE]'></span>
                    <span className='text-xs font-medium text-neutral-500'>Department</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='w-3 h-3 rounded-full bg-[#00C49F]'></span>
                    <span className='text-xs font-medium text-neutral-500'>Department</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='w-3 h-3 rounded-full bg-[#FFBB28]'></span>
                    <span className='text-xs font-medium text-neutral-500'>Department</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='w-3 h-3 rounded-full bg-[#FF8042]'></span>
                    <span className='text-xs font-medium text-neutral-500'>Department</span>
                </div>
            </div>
        </div>
    )
}