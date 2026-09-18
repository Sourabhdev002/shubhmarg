export {};

async function run() {
  const month = parseInt(process.argv[2], 10);
  const year = parseInt(process.argv[3], 10) || 2026;
  
  if (!month || month < 1 || month > 12) {
    console.error("Please provide a valid month (1-12) as the first argument.");
    process.exit(1);
  }

  const { generateCalendarMonth } = await import("../src/lib/calendar-engine");
  console.log(`Starting generation for ${year}-${month.toString().padStart(2, '0')} directly from engine...`);
  
  try {
    const result = await generateCalendarMonth(year, month);
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error generating month:", error);
    process.exit(1);
  }
}

run();
