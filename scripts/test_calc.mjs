const res = await fetch("http://localhost:3000/api/compatibility-calc", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    partner1: { name: "Aarav", rashiIndex: "0", nakshatraIndex: "0" },
    partner2: { name: "Ananya", rashiIndex: "6", nakshatraIndex: "14" },
  }),
});

const data = await res.json();
console.log("STATUS:", res.status);
console.log("SUCCESS:", data.success);
console.log("TOTAL SCORE:", data.milanBreakdown?.totalScore);
console.log("VERDICT:", data.milanBreakdown?.compatibilityVerdict);
console.log("NARRATIVE PREVIEW:", data.aiNarrative?.slice(0, 100));
