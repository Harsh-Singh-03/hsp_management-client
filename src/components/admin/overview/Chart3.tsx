import { Button } from '@/components/ui/button';
import { admin_dashboard } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Chart3 = () => {

  const [analytics, setAnalytics] = useState<{ isLoading: boolean, data: any }>({ isLoading: false, data: null });

  useEffect(() => {
    const fetchChart = async () => {
      setAnalytics({ isLoading: true, data: null });
      const response = await admin_dashboard.appointment_analytics({ filter: 'day' })
      setAnalytics({ isLoading: false, data: response?.data || [] });
      console.log(response, 'analytics')
    }
    fetchChart()
  }, [])

  return (
    <div className='w-full lg:w-[50%] max-h-[430px] bg-white rounded-xl lg:min-w-[400px]'>
      <div className='flex items-center justify-between p-4'>
        <h4 className='text-base font-semibold text-neutral-700'>Appointment Overview</h4>
        <Button size='sm' variant='outline' className='rounded-full' asChild>
          <Link to='/admin/appointments'>
            View all
          </Link>
        </Button>
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
          <AreaChart
            data={analytics.data || []}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}