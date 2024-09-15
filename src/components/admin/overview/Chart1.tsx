import { Button } from '@/components/ui/button';
import { admin_dashboard } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Chart1 = () => {
    const [analytics, setAnalytics] = useState<{ isLoading: boolean, data: any }>({ isLoading: false, data: null });

    useEffect(() => {
        const fetchChart = async () => {
            setAnalytics({ isLoading: true, data: null });
            const response = await admin_dashboard.patient_analytics({ filter: 'day' })
            setAnalytics({ isLoading: false, data: response?.data || [] });
            console.log(response, 'analytics1')
        }
        fetchChart()
    }, [])

    return (
        <div className='hidden lg:block w-[60%] max-h-[430px] bg-white rounded-xl min-w-[400px]'>
            <div className='flex items-center justify-between p-4'>
                <h4 className='text-base font-semibold text-neutral-700'>Patient Overview</h4>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-sky-800'></span>
                        <span className='text-xs font-medium text-neutral-500'>Recovered</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-sky-300'></span>
                        <span className='text-xs font-medium text-neutral-500'>Admitted</span>
                    </div>
                    <Button size='sm' variant='outline' className='rounded-full' asChild>
                        <Link to='/admin/patients'>
                            View all
                        </Link>
                    </Button>
                </div>
            </div>
            {analytics.isLoading && (
                <div className="flex justify-center w-full my-8">
                    <Loader2 className="w-12 h-12 animate-spin text-neutral-600" />
                </div>
            )}

            {!analytics.isLoading && analytics.data?.length === 0 && (
                <p className='text-base text-center text-gray-500'>No Appointment found in last 10 days</p>
            )}

            {!analytics.isLoading && analytics.data?.length > 0 && (
                <ResponsiveContainer width="100%" height="85%" className='py-4 pr-4 min-h-[300px]'>
                    <BarChart
                        data={analytics.data || []}
                        barSize={20}
                    >
                        <XAxis dataKey="day" className='text-xs truncate text-neutral-500' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Recovered" className='fill-sky-800' radius={[999, 999, 0, 0]} />
                        <Bar dataKey="Admitted" fill='#7dd3fc' radius={[999, 999, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}