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

🎉 The FollowupNICE UI wireframe is live! The React-based dashboard includes:

🗓 Appointments Panel: View upcoming follow-ups + trigger reminders

👨‍⚕️ Doctor Info: Quick access to doctor/patient overview

🔔 Reminder Log: Track sent reminders in real time

This layout uses TailwindCSS.

# 🏥 Health Reminder App

A human-centered, joy-driven AI-powered appointment reminder system for clinics and doctors. Built using React, Tailwind CSS, and low-code tools.

## 🌟 Features

* Patient + doctor appointment scheduling
* Auto-reminder via UI (SMS/WhatsApp backend ready)
* Visual timeline of reminders
* Sort + filter appointments
* Realtime-ready architecture (with Supabase)

## 🧱 Tech Stack

* React + Vite
* Tailwind CSS
* Supabase (backend & real-time)
* Vercel (deployment)
* Iconic UI with lucide-react

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/health-reminder-app.git
cd health-reminder-app
npm install
npm run dev
```

## ☁️ Deploy

Push to GitHub, then deploy with [Vercel](https://vercel.com).

## 🔐 Setup Supabase

1. Go to [https://supabase.com](https://supabase.com) → New Project
2. Add a **PostgreSQL table**:

```sql
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  doctor text,
  datetime timestamptz NOT NULL
);

CREATE TABLE reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text,
  status text,
  created_at timestamptz DEFAULT now()
);
```

3. Get your Supabase URL + anon key and place it in `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Install client:

```bash
npm install @supabase/supabase-js
```

## 📦 Push to GitHub

```bash
git init
git remote add origin https://github.com/your-username/health-reminder-app.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

---


