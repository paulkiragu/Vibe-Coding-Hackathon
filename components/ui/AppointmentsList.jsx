import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';


export default function AppointmentsList({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <p className="text-gray-500">No appointments found.</p>;
  }

  return (
    <div className="grid gap-4 mt-4">
      {appointments.map((appt) => (
        <Card key={appt.id}>
          <CardContent className="flex flex-col gap-1">
            <div className="font-bold">{appt?.name}</div>
            <div className="text-sm text-gray-600">
              Doctor: {appt?.doctorName}
            </div>
            <div className="text-sm text-gray-600">
              Time: {appt?.datetime
                ? new Date(appt.datetime).toLocaleString()
                : "N/A"}
            </div>
            <div className="text-sm text-gray-600">
              Channel: {appt?.channel}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}