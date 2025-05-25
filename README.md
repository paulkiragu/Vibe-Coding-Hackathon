# Vibe-Coding-Hackathon

 Workflow
1. Data Setup (Supabase + Lovable.dev)
Create tables for:

Patients

Doctors

Appointments

Reminders Log

Backend logic (with Bolt.new if needed) for:

Daily cron job to check upcoming appointments

Trigger WhatsApp/SMS via API (Twilio, Vonage, etc.)

2. Frontend UX (MGX)
Simple dashboard:
Doctors: See upcoming follow-ups, add notes, trigger reminders

Admins: Overview + reschedule UI

Optional patient portal: “See you soon!” reminder screen

3. Automated Messaging System
AI-generated messages from Claude.ai:

Friendly, local-language support

Personalized with patient’s name, appointment reason, time

Dynamic tone: caring, not clinical
