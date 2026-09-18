export {};

async function run() {
  const { generateCalendarMonth } = await import("../src/lib/calendar-engine");
  console.log("Starting October 2026 generation directly from engine...");
  const result = await generateCalendarMonth(2026, 10);
  console.log("Result:", JSON.stringify(result, null, 2));
}

run().catch(console.error);
