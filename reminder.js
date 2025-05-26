
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

// Supabase credentials
const SUPABASE_URL = 'https://kluyhtskgcmufpkmdfsi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdXlodHNrZ2NtdWZwa21kZnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDkzODEsImV4cCI6MjA2MzgyNTM4MX0.wneKpK4qPvG5GjuZ6gacQbqVj7NyBpI_lJgUloC90hw';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Twilio credentials
const accountSid = 'ACa1941e8f75501af80cf748098c8da8c3';
const authToken = '00744634abc9de199c02e153fd6d9b3c';
const client = twilio(accountSid, authToken);
const twilioNumber = '+17652912045';

async function sendReminders() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('appointment_date', today);

  if (error) {
    console.error('Supabase error:', error);
    return;
  }

  if (data.length === 0) {
    console.log('No appointments today.');
    return;
  }

  for (let patient of data) {
    const message = `Hi ${patient.name}, this is a reminder for your appointment today.`;

    try {
      await client.messages.create({
        body: message,
        from: twilioNumber,
        to: patient.phone  
      });
      console.log(`✅ Reminder sent to ${patient.phone}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${patient.phone}`, err);
    }
  }
}

sendReminders();
