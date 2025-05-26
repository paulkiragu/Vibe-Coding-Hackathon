const SUPABASE_URL = 'https://kluyhtskgcmufpkmdfsi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdXlodHNrZ2NtdWZwa21kZnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDkzODEsImV4cCI6MjA2MzgyNTM4MX0.wneKpK4qPvG5GjuZ6gacQbqVj7NyBpI_lJgUloC90hw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;

  const status = document.getElementById('status');
  status.textContent = '⏳ Submitting...';
  status.style.color = 'black';

  const { data, error } = await supabaseClient.from('patients').insert([
    { name, phone, appointment_date: date }
  ]);

  if (error) {
    console.error(error);
    status.textContent = '❌ Failed to submit. Try again.';
    status.style.color = 'red';
  } else {
    status.textContent = '✅ Submitted successfully!';
    status.style.color = 'green';
    document.getElementById('appointmentForm').reset();
  }
});
