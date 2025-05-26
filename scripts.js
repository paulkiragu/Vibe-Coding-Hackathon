
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;

  const status = document.getElementById('status');
  status.textContent = '⏳ Submitting...';
  status.style.color = 'black';

  const { data, error } = await client.from('patients').insert([
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
