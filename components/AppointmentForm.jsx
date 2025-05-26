import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AppointmentForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    doctorName: '',
    datetime: '',
    channel: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
    setForm({ name: '', doctorName: '', datetime: '', channel: '' });
  };

  return (
    <Card>
      <CardContent>
        <Label>Name</Label>
        <Input
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter client name"
        />

        <Label>Doctor</Label>
        <Input
          value={form.doctorName}
          onChangeText={(text) => handleChange('doctorName', text)}
          placeholder="Enter doctor's name"
        />

        <Label>Date & Time</Label>
        <Input
          value={form.datetime}
          onChangeText={(text) => handleChange('datetime', text)}
          placeholder="e.g., 2025-06-01 14:00"
        />

        <Label>Channel</Label>
        <Input
          value={form.channel}
          onChangeText={(text) => handleChange('channel', text)}
          placeholder="e.g., Zoom, Phone"
        />

        <View style={{ marginTop: 16 }}>
          <Button title="Add Appointment" onPress={handleSubmit} />
        </View>
      </CardContent>
    </Card>
  );
}
