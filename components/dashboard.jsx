import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appt) => {
    setAppointments((prev) => [...prev, { ...appt, id: Date.now().toString() }]);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Appointment Dashboard
      </Text>
      <AppointmentForm onSubmit={addAppointment} />
      <AppointmentsList appointments={appointments} />
    </View>
  );
}
