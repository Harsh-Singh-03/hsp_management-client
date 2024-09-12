import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

type HelpQuery = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  query: string;
  createdAt: string;
  updatedAt: string;
}
interface props {
  helpQuery: HelpQuery;
  onAction: any;  // null for no action, otherwise action type string

}

export const HelpCard = ({ helpQuery, onAction }: props) => {
  return (
    <div className="flex flex-col w-full overflow-hidden border rounded-lg shadow-sm bg-sky-500/10">
      <div className="flex-1 p-4 space-y-2">
        <div className="mb-2 text-xl font-bold">{helpQuery.name}</div>
        <p className="text-base text-gray-700">
          <strong>Email :</strong> {helpQuery.email}
        </p>
        <p className="text-base text-gray-700">
          <strong>Phone :</strong>  {helpQuery.phone}
        </p>
        <p className="text-base text-gray-700">
          <strong>Query :</strong> {helpQuery.query}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          <strong>Created At :</strong> {new Date(helpQuery.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-end p-4 bg-neutral-100">
        <Button variant='primary' onClick={() => onAction(helpQuery._id)}>
          Take Action
        </Button>
      </div>
    </div>
  );
};

export const SkeletonHelpCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_: any, i: number) => (
        <Skeleton key={i} className='w-full overflow-hidden border rounded-lg shadow-sm aspect-video' />
      ))}
    </div>
  )
}
