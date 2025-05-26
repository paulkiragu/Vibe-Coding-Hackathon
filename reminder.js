require('dotenv').config(); // Load environment variables

const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Twilio setup
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const twilioNumber = process.env.TWILIO_NUMBER;

async function sendReminders() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('appointment_date', today);

  if (error) {
    console.error('❌ Supabase error:', error);
    return;
  }

  if (!data.length) {
    console.log('📭 No appointments today.');
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
      console.error(`❌ Failed to send to ${patient.phone}:`, err.message);
    }
  }
}

sendReminders();
