// reminder.cjs
require('dotenv').config();               // Load .env

const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');
const dayjs = require('dayjs');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

async function sendReminders() {
  // Fetch appointments in the next hour
  const { data: upcoming, error } = await supabase
    .from('appointments')
    .select('id, datetime, patient:patients (name, phone)')
    .gte('datetime', dayjs().toISOString())
    .lt('datetime', dayjs().add(1, 'hour').toISOString());

  if (error) {
    console.error('Error fetching appointments:', error);
    return;
  }

  for (const appt of upcoming) {
    const { id, datetime, patient } = appt;
    const message = `Hi ${patient.name}, reminder for your appointment at ${dayjs(datetime).format('hh:mm A')}.`;

    try {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: patient.phone
      });

      await supabase.from('reminders').insert([{ appointment_id: id, status: 'sent' }]);
      console.log(`✔️ Sent to ${patient.name}`);
    } catch (err) {
      console.error(`❌ Failed for ${patient.name}:`, err.message);
      await supabase.from('reminders').insert([{ appointment_id: id, status: 'failed' }]);
    }
  }
}

sendReminders();
