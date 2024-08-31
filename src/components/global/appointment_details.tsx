import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { useEffect, useState } from 'react';
import { appointment_api } from '@/lib/api';
import { toast } from 'react-toastify';
import { UserAvatar } from './user-avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { format } from 'date-fns';

interface props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  type: 'patient' | 'doctor' | 'admin'
}

const AppointmentDetailsModal = ({ open, setOpen, id, type }: props) => {

  const [appointment, setAppointment] = useState<any | null>(null);

  useEffect(() => {
    const onSubmit = async () => {
      // setIsSubmitting(true)
      const data = await appointment_api.getDetails(id, type)
      if (data.success === true) {
        setAppointment(data.data)
        // setIsSubmitting(false)

      } else {
        toast.warn(data.message)
      }
    }
    if (id) {
      onSubmit()
    }
  }, [id])

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-bold tracking-wide text-center">Appointment Details</DialogTitle>
          <DialogDescription className="text-center">Detailed information about the appointment.</DialogDescription>
        </DialogHeader>
        {!appointment && (
          <div className="grid my-32 place-items-center">
            <Loader2 className="animate-spin text-neutral-400 w-14 h-14" />
          </div>
        )}
        {appointment && appointment._id && (
          <ScrollArea className="p-4 pt-0 space-y-4 mt-0 h-[60vh] mb-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Reference:</span>
              <span>{appointment?.ref}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Status:</span>
              <span>{appointment?.current_status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Department:</span>
              <span>{appointment?.department}</span>
            </div>
            <Separator className='mt-3 mb-2' />
            <div className='flex justify-between gap-4 mb-4'>
              <div className="flex items-center space-x-4">
                <UserAvatar placeholder={appointment?.doctor?.name} imageUrl={appointment?.doctor?.profile_image} />
                <div>
                  <span className="font-semibold">Doctor:</span>
                  <p>{appointment?.doctor?.name}</p>
                  <p className="text-sm text-gray-500">Phone: {appointment?.doctor?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <UserAvatar placeholder={appointment?.patient?.name} imageUrl={appointment?.patient?.profile_image} />
                <div>
                  <span className="font-semibold">Patient:</span>
                  <p>{appointment?.patient?.name}</p>
                  <p className="text-sm text-gray-500">Phone: {appointment?.patient?.phone}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">From:</span>
              <span>{format(new Date(appointment?.from), 'do MMMM, yyyy hh:mm')}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">To:</span>
              <span>{format(new Date(appointment?.to), 'do MMMM, yyyy hh:mm')}</span>
            </div>
            <div className='mb-2'>
              <span className="font-semibold">Reason:</span>
              <p>{appointment?.reason}</p>
            </div>
            <div>
              <span className="font-semibold">Logs:</span>
              <ul className="pb-2 pl-5 list-disc">
                {appointment?.logs.map((log: any) => (
                  <li key={log._id} className="mb-1 text-sm" >
                    <span className="font-semibold">{log.status}:</span> {log.remarks}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;
