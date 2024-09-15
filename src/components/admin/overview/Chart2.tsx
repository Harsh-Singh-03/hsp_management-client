import { Button } from '@/components/ui/button';
import { admin_dashboard } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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

    const [analytics, setAnalytics] = useState<{ isLoading: boolean, data: any }>({ isLoading: false, data: null });

    useEffect(() => {
        const fetchChart = async () => {
            setAnalytics({ isLoading: true, data: null });
            const response = await admin_dashboard.department_analytics({ day_count: 30 })
            setAnalytics({ isLoading: false, data: response?.data || [] });
            console.log(response, 'mksd')
        }
        fetchChart()
    }, [])

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
            {analytics.isLoading && (
                <div className="flex justify-center w-full my-8">
                    <Loader2 className="w-12 h-12 animate-spin text-neutral-600" />
                </div>
            )}
            {!analytics.isLoading && (
                <>
                    <div className='grid flex-1 w-full place-items-center'>
                        <PieChart className='w-full h-full' width={300} height={300}>
                            <Pie
                                data={analytics.data}
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                label
                                dataKey="totalAppointments"
                            >
                                <Tooltip />
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        {analytics?.data?.map((item: any, index: number) => (
                            <div className='flex items-center gap-1' key={index}>
                                <span className={cn(
                                    'w-3 h-3 rounded-full',
                                    index === 0 && 'bg-[#0088FE]',
                                    index === 1 && 'bg-[#00C49F]',
                                    index === 2 && 'bg-[#FFBB28]',
                                    index === 3 && 'bg-[#FF8042]',
                                )}></span>
                                <span className='text-xs font-medium text-neutral-500'>{item?.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}