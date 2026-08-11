export const SERVICE_PRICING: Record<string, number> = {
  "vedic-guidance": 501,
  "career-business": 501,
  "marriage": 501,
  "kundli": 1101,
  "muhurat": 251,
  "remedy": 1101,
  "jaap": 2101,
};

export function getServicePrice(serviceId: string): number {
  return SERVICE_PRICING[serviceId] || 501; // Default fallback pricing
}
