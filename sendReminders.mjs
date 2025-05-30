// 🚀 FOLLOWUPJOY: SMS Follow-Up Reminder System

// Technologies used:
// - Supabase: Realtime DB + Auth
// - Lovable.dev/Bolt.new: Backend logic scaffolding
// - Claude.ai: Message crafting (optional step)
// - Twilio (or alternative): SMS delivery
// - MGX: Frontend UI design

// --- Step 1: Database Schema (Supabase SQL or Prisma-style ORM) ---

/*
Table: patients
- id (uuid, primary key)
- name (text)
- phone (text)
- preferred_language (text)

Table: doctors
- id (uuid, primary key)
- name (text)

Table: appointments
- id (uuid, primary key)
- patient_id (uuid, foreign key)
- doctor_id (uuid, foreign key)
- datetime (timestamp)
- status (text: scheduled/completed/cancelled)

Table: reminders
- id (uuid, primary key)
- appointment_id (uuid, foreign key)
- sent_at (timestamp)
*/

// --- Step 2: Reminder Logic (Node.js example with Supabase and Twilio) ---

import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';
import dayjs from 'dayjs';
import 'dotenv/config'; // Load environment variables from .env file


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendReminders() {
  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const nextDay = tomorrow.add(1, 'day');

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('id, datetime, status, patients(name, phone, preferred_language), doctors(name)')
    .gte('datetime', tomorrow.toISOString())
    .lt('datetime', nextDay.toISOString())
    .eq('status', 'scheduled');

  if (error) {
    console.error('Error fetching appointments:', error);
    return;
  }

  for (const appt of appointments) {
    // Simulate AI-generated message based on language (in real case, use Claude.ai or prompt API)
    const message = generateFriendlyMessage(
      appt.patients.name,
      appt.doctors.name,
      appt.datetime,
      appt.patients.preferred_language
    );

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: appt.patients.phone
    });

    await supabase.from('reminders').insert({ appointment_id: appt.id, sent_at: new Date().toISOString() });
  }
}

function generateFriendlyMessage(patientName, doctorName, datetime, lang) {
  const dateFormatted = dayjs(datetime).format('dddd [at] h:mm A');

  const messages = {
    en: `👋 Hi ${patientName}! Just a friendly reminder from ${doctorName} – your follow-up is on ${dateFormatted}. We can’t wait to see you! 💙`,
    es: `👋 ¡Hola ${patientName}! Un recordatorio amistoso de parte de ${doctorName} – tu cita es el ${dateFormatted}. ¡Nos encantará verte! 💙`,
    fr: `👋 Salut ${patientName} ! Petit rappel de ${doctorName} – votre rendez-vous est prévu ${dateFormatted}. On a hâte de vous voir ! 💙`
  };

  return messages[lang] || messages['en'];
}

sendReminders();
