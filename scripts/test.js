const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data, error } = await supabase.from('calendar_occurrences').select('*, calendar_events!inner(*)').eq('calendar_events.published', true).limit(1).maybeSingle();
  console.log('Data:', data);
  if (error) {
    console.log('Error:', error);
    console.log('Error Stringified:', JSON.stringify(error));
    console.log('Error Keys:', Object.keys(error));
    console.log('Error Message:', error.message);
  }
}
run();
