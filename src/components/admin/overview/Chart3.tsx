import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Chart3 = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];

  return (
    <div className='w-[50%] max-h-[430px] bg-white rounded-xl min-w-[400px]'>
      <div className='flex items-center justify-between p-4'>
        <h4 className='text-base font-semibold text-neutral-700'>Appointment Overview</h4>
        <Button size='sm' variant='outline' className='rounded-full'>
          View all
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="85%" className='py-4 pr-4'>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#1e3a8a" fill="#3b82f6"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}